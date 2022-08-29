from fastapi import APIRouter, Depends, status, Response, HTTPException
import models, schemas, database, auth_token, utils
from sqlalchemy.orm import Session


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
def create_message(
    received_user_id,
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
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message
