from fastapi import FastAPI
from backend import models, database
from backend.routers import thread
from backend.database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(thread.router)
get_db = database.get_db
