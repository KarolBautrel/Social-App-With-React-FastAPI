from pydantic import BaseModel, EmailStr
from typing import List, Optional


class CreateUpdatePost(BaseModel):
    title: str
    body: str

    class Config:
        orm_mode = True


class UserInfo(BaseModel):
    username: str
    email: str
    id: int

    class Config:
        orm_mode = True


class PostInfo(BaseModel):
    title: str
    body: str

    class Config:
        orm_mode = True


class Comment(BaseModel):
    id: int
    body: str
    comment_creator: UserInfo
    commented_post: PostInfo

    class Config:
        orm_mode = True


class CreateUser(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str


class RequestUser(BaseModel):
    username: str
    email: str
    id: str

    class Config:
        orm_mode = True


class DisplayPost(BaseModel):
    title: str
    body: str
    id: int
    creator: UserInfo
    participants: List[UserInfo]
    comments: List[Comment]

    class Config:
        orm_mode = True


class ListPost(BaseModel):
    title: str
    id: int

    class Config:
        orm_mode = True


class ListParticipiedPost(BaseModel):
    title: str
    id: int

    class Config:
        orm_mode = True


class DisplayUser(BaseModel):
    username: str
    email: str
    posts: List[ListPost]
    participant: List[ListParticipiedPost]
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class CommentCreation(BaseModel):
    body: str
