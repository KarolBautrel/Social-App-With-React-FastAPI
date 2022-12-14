from fastapi import APIRouter, Depends, status, Response, HTTPException
import models, schemas, database, auth_token
from sqlalchemy.orm import Session
from typing import List
from hashing import Hash
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/user", tags=["users"])

get_db = database.get_db


@router.post("/", response_model=schemas.DisplayUser)
def create_user(request: schemas.CreateUser, db: Session = Depends(get_db)):

    if not request.password == request.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Passwords doesnt match"
        )
    if db.query(models.User).filter(models.User.email == request.email).first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User already exists"
        )
    new_user = models.User(
        username=request.username,
        email=request.email,
        password=Hash.bcrypt(request.password),
    )
    db.add(new_user)
    db.commit()
    new_user_inbox = models.Inbox(owner=new_user)
    db.add(new_user_inbox)
    db.commit()
    db.refresh(new_user_inbox)
    return new_user


@router.get("/me", response_model=schemas.DisplayUser)
def get_request_user(
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    if not request_user:
        return Response(
            {"Error": "You are not logged in"}, status_code=status.HTTP_404_NOT_FOUND
        )
    return request_user


@router.get("/{user_id}", response_model=schemas.DisplayUser)
def get_user(user_id, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User does not exist"
        )

    return user


@router.delete("/")
def delete_request_user_account(
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):

    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    if not request_user:
        return Response(
            {"Error": "You are not logged in"}, status_code=status.HTTP_404_NOT_FOUND
        )
    db.delete(request_user)
    db.commit()
    return Response(
        {"Message": "Account deleted successfully"}, status_code=status.HTTP_200_OK
    )


@router.patch("/change_mail")
def change_email(
    request: schemas.ChangeEmail,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    print(request_user)
    if not "@" in request.new_email:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Please write correct email"
        )
    request_user.email = request.new_email
    db.commit()
    return Response(status_code=status.HTTP_200_OK)


@router.patch("/change_password")
def change_password(
    request: schemas.ChangePassword,
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):

    request_user = (
        db.query(models.User).filter(models.User.email == current_user.email).first()
    )
    print(request.new_password)
    print(request.old_password)
    if not Hash.verify_password(request.old_password, request_user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Please old password is wrong"
        )
    print("dziala")
    if not request.new_password == request.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Passwords doesnt match"
        )

    hashed_password = Hash.bcrypt(request.new_password)
    request_user.password = hashed_password
    db.commit()
    return Response(status_code=status.HTTP_200_OK)
