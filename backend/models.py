from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base


class Thread(Base):
    __tablename__ = "threads"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    body = Column(String, unique=False, index=True)
    # user_id = Column(Integer, ForeignKey("users.id"))

    # creator = relationship("User", back_populates="threads")

    def __str__(self):
        return self.title


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(Integer, primary_key=True, index=True)
    email = Column(Integer, primary_key=True, index=True)
    password = Column(Integer, primary_key=True, index=True)
    # threads = relationship("Thread", back_populates="creator")
