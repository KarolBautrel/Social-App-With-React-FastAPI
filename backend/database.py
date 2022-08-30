from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve()
env_path = os.path.join(Path(__file__).resolve().parent.parent, ".env")
load_dotenv(env_path)
# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@db/my_db"
SQLALCHEMY_DATABASE_URL = f"postgresql://{os.environ['POSTGRES_LOCAL_USER']}:{os.environ['POSTGRES_LOCAL_PASSWORD']}@localhost:5433/{os.environ['POSTGRES_LOCAL_DB']}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)


# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
# )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
