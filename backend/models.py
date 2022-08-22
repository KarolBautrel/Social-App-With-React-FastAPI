from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base
from hashing import Hash


class Post(Base):
    __tablename__ = "posts"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )
    title = Column(String, unique=True, index=True)
    body = Column(String, unique=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    creator = relationship("User", back_populates="posts")

    def __str__(self):
        return self.title


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(Integer, unique=True, index=True)
    email = Column(Integer, unique=True, index=True)
    password = Column(Integer, unique=False, index=True)
    posts = relationship("Post", back_populates="creator")

    def verify_password(self, password):
        return Hash.verify_password(password, self.password)
