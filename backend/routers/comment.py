from fastapi import APIRouter, Depends, status, Response, HTTPException
import models, schemas, database, auth_token
from sqlalchemy.orm import Session
from typing import List


router = APIRouter(
    prefix="/comment",
    tags=["comments "],
)

get_db = database.get_db


@router.post(
    "/{post_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.Comment,
)
def create_comment(
    post_id,
    request: schemas.CommentCreation,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    commented_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not commented_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="There is no post like this"
        )
    new_comment = models.Comment(
        body=request.body, comment_creator=request_user, commented_post=commented_post
    )
    commented_post.participants.append(request_user)
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment


@router.get("/", response_model=List[schemas.Comment])
def list_all_comments(db: Session = Depends(get_db)):
    comments = db.query(models.Comment).all()

    return comments


@router.put("/{comment_id}", response_model=schemas.Comment)
def update_comment(
    comment_id,
    request: schemas.UpdateComment,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    comment = db.query(models.Comment).filter(models.Comment.id == comment_id)
    current_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="There is no comment like this",
        )
    if not comment.first().comment_creator.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Only cretor of comment can edit it",
        )

    comment.update(request.dict())
    db.commit()
    return comment.first()


@router.delete("/{comment_id}")
def delete_message(
    comment_id,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):

    comment = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    current_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="There is no comment like this",
        )
    if not comment.comment_creator == current_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Only cretor of comment can delete it",
        )
    db.delete(comment)
    db.commit()
    return Response(status_code=status.HTTP_200_OK)
