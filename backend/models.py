from calendar import c
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table, DateTime
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


class Topic(Base):
    __tablename__ = "topics"
    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )
    topic_name = Column(String, unique=True, index=True)
    rooms = relationship("Post", back_populates="topics")


class Post(Base):
    __tablename__ = "posts"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    title = Column(String, unique=True, index=True)
    body = Column(String, unique=False, index=True)
    topic_id = Column(Integer, ForeignKey("topics.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    creator = relationship("User", back_populates="posts")
    participants = relationship(
        "User", secondary=participants_table, backref="participant"
    )
    comments = relationship("Comment", back_populates="commented_post")
    followers = relationship("User", secondary=followers_table, backref="follower")
    topics = relationship("Topic", back_populates="rooms")

    def __str__(self):
        return self.title


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, unique=False, index=True)
    posts = relationship("Post", back_populates="creator")
    comments = relationship("Comment", back_populates="comment_creator")
    messages_sent = relationship(
        "DirectMessage", back_populates="creator", cascade="all, delete"
    )
    inbox = relationship("Inbox", back_populates="owner", cascade="all, delete")

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


class DirectMessage(Base):
    __tablename__ = "direct_message"

    id = Column(Integer, primary_key=True)
    subject = Column(String)
    body = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    inbox = Column(Integer, ForeignKey("inbox.id"))
    creator = relationship("User", back_populates="messages_sent")
    received_inbox = relationship("Inbox", back_populates="messages")
    is_readed = Column(Boolean)


class Inbox(Base):
    __tablename__ = "inbox"
    id = Column(Integer, unique=True, primary_key=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="inbox")
    messages = relationship("DirectMessage", back_populates="received_inbox")
