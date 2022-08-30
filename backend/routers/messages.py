from fastapi import APIRouter, Depends, status, Response, HTTPException, BackgroundTasks
import models, schemas, database, auth_token, utils
from sqlalchemy.orm import Session
import tasks
from typing import List

router = APIRouter(prefix="/messages", tags=["messages"])

get_db = database.get_db


@router.get("/inbox", response_model=schemas.Inbox)
def get_inbox(
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):

    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )

    inbox = db.query(models.Inbox).filter(models.Inbox.owner == request_user).first()

    return inbox


@router.post("/{received_user_id}")
async def create_message(
    received_user_id,
    background_tasks: BackgroundTasks,
    request: schemas.CreateMessage,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    receiver = db.query(models.User).filter(models.User.id == received_user_id).first()
    if not receiver:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="There is no user like this"
        )
    if receiver == request_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="You cant send message to yourself",
        )
    try:
        print(request.subject, request.body, request_user, receiver.inbox)
        new_message = models.DirectMessage(
            subject=request.subject,
            body=request.body,
            is_readed=False,
            creator=request_user,
            received_inbox=receiver.inbox[0],
        )
    except:
        return "Nie udalo sie "
    try:
        background_tasks.add_task(
            tasks.send_email,
            receiver.email,
            message_body=f"Youve got new Message from {request_user.username}",
        )
    except:
        return "Nie wyslalem maila"
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message


@router.patch("/{message_id}")
def mark_as_readed(
    message_id,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    message = db.query(models.DirectMessage).filter(
        models.DirectMessage.id == message_id
    )
    if not message.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="There is no message"
        )

    if message.first().received_inbox.owner == request_user:
        message.first().is_readed = True
        db.commit()
        return message.first()
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="You are not reciver"
    )
