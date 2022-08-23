from fastapi import APIRouter, Depends, status, Response, HTTPException
import models, schemas, database, auth_token
from sqlalchemy.orm import Session
from typing import List


router = APIRouter(
    dependencies=[Depends(auth_token.get_current_user)],
    prefix="/message",
    tags=["messages"],
)

get_db = database.get_db


@router.post(
    "/{post_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.Comment,
)
def create_message(
    post_id,
    request: schemas.CommentCreation,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    commented_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    new_comment = models.Comment(
        body=request.body, comment_creator=request_user, commented_post=commented_post
    )
    commented_post.participants.append(request_user)
    print(new_comment)
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment


@router.get("/", response_model=List[schemas.Comment])
def list_all_posts(db: Session = Depends(get_db)):
    comments = db.query(models.Comment).all()
    for i in comments:
        print(i.comment_creator, i.commented_post)

    return comments
