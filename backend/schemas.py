from pydantic import BaseModel, EmailStr
from typing import List, Optional


class CreateThread(BaseModel):
    title: str
    body: str

    class Config:
        orm_mode: True


class User(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str


class DisplayThread(BaseModel):
    title: str
    body: str

    class Config:
        orm_mode = True


class DisplayUser(BaseModel):
    username: str
    email: str
    threads: List[DisplayThread]
    id: int

    class Config:
        orm_mode = True
