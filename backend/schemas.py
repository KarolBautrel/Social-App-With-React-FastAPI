from pydantic import BaseModel, EmailStr
from typing import List, Optional


class CreateUpdatePost(BaseModel):
    topic_name: str
    title: str
    body: str

    class Config:
        orm_mode = True


class UpdateComment(BaseModel):
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
    id: int

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
    id: int

    class Config:
        orm_mode = True


class Topic(BaseModel):
    topic_name: str

    class Config:
        orm_mode = True


class DisplayPost(BaseModel):
    topics: Topic
    title: str
    body: str
    id: int
    creator: UserInfo
    participants: List[UserInfo]
    comments: List[Comment]
    followers: List[UserInfo]

    class Config:
        orm_mode = True


class ListPost(BaseModel):
    topics: Topic
    title: str
    id: int

    class Config:
        orm_mode = True


class ListParticipiedFollowingPost(BaseModel):
    title: str
    id: int

    class Config:
        orm_mode = True


class DisplayUser(BaseModel):
    username: str
    email: str
    posts: List[ListPost]
    participant: List[ListParticipiedFollowingPost]
    follower: List[ListParticipiedFollowingPost]
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


class CreateMessage(BaseModel):
    subject: str
    body: str

    class Config:
        orm_mode = True


class Message(BaseModel):
    id: int
    subject: str
    creator: UserInfo
    is_readed: bool

    class Config:
        orm_mode = True


class Inbox(BaseModel):
    owner: UserInfo
    messages: List[Message]

    class Config:
        orm_mode = True


class CreateTopic(BaseModel):
    topic_name: str

    class Config:
        orm_mode = True
