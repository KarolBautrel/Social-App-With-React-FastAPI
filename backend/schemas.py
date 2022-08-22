from pydantic import BaseModel, EmailStr
from typing import List, Optional


class User(BaseModel):
    username: str
    email: str
    id: str


class CreatePost(BaseModel):
    title: str
    body: str

    class Config:
        orm_mode: True


class DisplayUserAsCreator(BaseModel):
    username: str

    class Config:
        orm_mode = True


class CreateUser(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str


class DisplayPost(BaseModel):
    title: str
    body: str
    id: int
    creator: DisplayUserAsCreator

    class Config:
        orm_mode = True


class DisplayUser(BaseModel):
    username: str
    email: str
    posts: List[DisplayPost]
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
