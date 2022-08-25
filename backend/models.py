from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship
from database import Base
from hashing import Hash

participants_table = Table(
    "participants_table",
    Base.metadata,
    Column("users_id", ForeignKey("users.id"), primary_key=True),
    Column("posts_id", ForeignKey("posts.id"), primary_key=True),
)

followers_table = Table(
    "followers_table",
    Base.metadata,
    Column("users_id", ForeignKey("users.id"), primary_key=True),
    Column("posts_id", ForeignKey("posts.id"), primary_key=True),
)


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
    participants = relationship(
        "User", secondary=participants_table, backref="participant"
    )
    comments = relationship("Comment", back_populates="commented_post")
    followers = relationship("User", secondary=followers_table, backref="follower")

    def __str__(self):
        return self.title


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(Integer, unique=True, index=True)
    email = Column(Integer, unique=True, index=True)
    password = Column(Integer, unique=False, index=True)
    posts = relationship("Post", back_populates="creator")
    comments = relationship("Comment", back_populates="comment_creator")

    def verify_password(self, password):
        return Hash.verify_password(password, self.password)


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)
    body = Column(String, unique=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    room_id = Column(Integer, ForeignKey("posts.id"))
    comment_creator = relationship("User", back_populates="comments")
    commented_post = relationship("Post", back_populates="comments")
