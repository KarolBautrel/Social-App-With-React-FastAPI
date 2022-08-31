from fastapi import FastAPI
import models, database
from routers import post, user, auth, comment, messages, topic
from database import engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(topic.router)
app.include_router(post.router)
app.include_router(comment.router)
app.include_router(user.router)
app.include_router(messages.router)


get_db = database.get_db
