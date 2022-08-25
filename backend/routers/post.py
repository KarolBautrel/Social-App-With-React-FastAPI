from fastapi import APIRouter, Depends, status, Response, HTTPException
import models, schemas, database, auth_token
from sqlalchemy.orm import Session
from typing import List


router = APIRouter(
    dependencies=[Depends(auth_token.get_current_user)], prefix="/post", tags=["posts"]
)

get_db = database.get_db


@router.post(
    "/", status_code=status.HTTP_201_CREATED, response_model=schemas.DisplayPost
)
def create_post(
    request: schemas.CreateUpdatePost,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    print(request_user)
    new_post = models.Post(title=request.title, body=request.body, creator=request_user)
    new_post.participants.append(request_user)
    new_post.followers.append(request_user)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


@router.get("/", response_model=List[schemas.DisplayPost])
def list_all_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()
    for i in posts:
        for participant in i.participants:
            print(participant.id)
    return posts


@router.get("/{post_id}", response_model=schemas.DisplayPost)
def retrieve_post(post_id, db: Session = Depends(get_db)):

    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="There is no post like this"
        )
    for i in post.comments:
        print(i.body)
    return post


@router.put("/{post_id}", response_model=schemas.DisplayPost)
def put_post(
    post_id,
    request: schemas.CreateUpdatePost,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    post = db.query(models.Post).filter(models.Post.id == post_id)
    if not post.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="There is no post like this"
        )
    if not (
        post.first().creator
        == db.query(models.User).filter(models.User.email == current_user.email).first()
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Only cretor of blog can update it",
        )
    print(request)
    post.update(request.dict())
    db.commit()
    return post.first()


@router.delete("/{post_id}")
def delete_post(
    post_id,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="There is no post like this"
        )
    if not (
        post.creator
        == db.query(models.User).filter(models.User.email == current_user.email).first()
    ):

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Only cretor of blog can delete it",
        )

    db.delete(post)
    db.commit()

    return Response(status_code=status.HTTP_200_OK, content="Post deleted successfully")


@router.patch("/follow/{post_id}", response_model=schemas.DisplayPost)
def follow_post(
    post_id,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    post = db.query(models.Post).filter(models.Post.id == post_id)
    if not post.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post doesnt exist"
        )
    if post.first().creator == request_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="You cant follow your own post",
        )
    if request_user in post.first().followers:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="You are already following this post",
        )
    post = post.first()
    post.followers.append(request_user)
    db.commit()
    return post


@router.patch("/unfollow/{post_id}", response_model=schemas.DisplayPost)
def unfollow_post(
    post_id,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    post = db.query(models.Post).filter(models.Post.id == post_id)
    if not post.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post doesnt exist"
        )
    if post.first().creator == request_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="You cant unfollow your own post",
        )
    if not request_user in post.first().followers:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="You are not following this post",
        )
    post = post.first()
    post.followers.remove(request_user)
    db.commit()
    return post
