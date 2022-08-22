from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Union
import os
from pathlib import Path
from dotenv import load_dotenv
import schemas

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException, status

BASE_DIR = Path(__file__).resolve()
print(BASE_DIR)
env_path = os.path.join(Path(__file__).resolve().parent.parent, ".env")
load_dotenv(env_path)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(token: dict, expires_delta: Union[timedelta, None] = None):

    to_encode = token.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM")
    )
    return encoded_jwt


def verify_token(token: str, credentials_exception):
    print(token)
    try:

        payload = jwt.decode(
            token=token, key=os.getenv("SECRET_KEY"), algorithms=os.getenv("ALGORITHM")
        )
        email: str = payload.get("sub")

        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
        return token_data
    except:
        raise credentials_exception


def get_current_user(token: str = Depends(oauth2_scheme)):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return verify_token(token, credentials_exception)
