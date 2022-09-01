from fastapi import APIRouter, Depends, status, Response, HTTPException
import models, schemas, database, auth_token
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta

router = APIRouter(prefix="/login", tags=["auth_token"])
get_db = database.get_db


@router.post("/")
def get_jwt_token(
    request: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(database.get_db),
):
    user = db.query(models.User).filter(models.User.email == request.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="invalid credentials"
        )
    if not user.verify_password(request.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="invalid password"
        )

    access_token_expires = timedelta(minutes=30)
    access_token = auth_token.create_access_token(
        data={
            "user_email": user.email,
            "user_id": user.id,
            "user_username": user.username,
        },
        expires_delta=access_token_expires,
    )
    print(access_token)
    return {
        "access_token": access_token["token"],
        "token_type": "Bearer",
        "user": access_token["data"],
    }


@router.get("/logout")
def index():
    pass
