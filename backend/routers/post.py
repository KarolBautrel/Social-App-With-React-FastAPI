from fastapi import APIRouter, Depends, status, Response, HTTPException
import models, schemas, database, auth_token
from sqlalchemy.orm import Session
from typing import List


router = APIRouter(
    dependencies=[Depends(auth_token.get_current_user)], prefix="/post", tags=["posts"]
)

get_db = database.get_db


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_post(
    request: schemas.CreatePost,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth_token.get_current_user),
):
    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    print(request_user)
    new_thread = models.Post(
        title=request.title, body=request.body, creator=request_user
    )

    db.add(new_thread)
    db.commit()
    db.refresh(new_thread)
    return new_thread


@router.get("/", response_model=List[schemas.DisplayPost])
def list_all_posts(db: Session = Depends(get_db)):
    threads = db.query(models.Post).all()
    return threads


@router.get("/{post_id}", response_model=schemas.DisplayPost)
def retrieve_post(post_id, db: Session = Depends(get_db)):

    blog = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="There is no post like this"
        )
    return blog
