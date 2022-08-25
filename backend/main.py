from fastapi import FastAPI
import models, database
from routers import post, user, auth, comment
from database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(comment.router)
get_db = database.get_db
