from fastapi import APIRouter, Depends, status, Response, HTTPException
import models, schemas, database
from sqlalchemy.orm import Session
from typing import List
from hashing import Hash

router = APIRouter(prefix="/user", tags=["users"])

get_db = database.get_db


@router.post("/", response_model=schemas.DisplayUser)
def create_user(request: schemas.CreateUser, db: Session = Depends(get_db)):
    if not request.password == request.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Passwords doesnt match"
        )
    new_user = models.User(
        username=request.username,
        email=request.email,
        password=Hash.bcrypt(request.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
