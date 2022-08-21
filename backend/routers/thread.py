from fastapi import APIRouter, Depends, status, Response, HTTPException
from .. import models, schemas, database
from sqlalchemy.orm import Session
from typing import List


router = APIRouter(prefix="/thread", tags=["blogs"])

get_db = database.get_db


@router.post("/", status_code=status.HTTP_201_CREATED)
def create(request: schemas.CreateThread, db: Session = Depends(get_db)):
    new_thread = models.Thread(title=request.title, body=request.body)
    db.add(new_thread)
    db.commit()
    db.refresh(new_thread)
    return new_thread


@router.get("/", response_model=List[schemas.DisplayThread])
def list_all_threads(db: Session = Depends(get_db)):
    threads = db.query(models.Thread).all()
    return threads
