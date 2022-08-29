from fastapi import APIRouter, Depends, status, Response, HTTPException
import models, schemas, database, auth_token, utils
from sqlalchemy.orm import Session


router = APIRouter(
    dependencies=[Depends(auth_token.get_current_user)],
    prefix="/topic",
    tags=["topics"],
)

get_db = database.get_db


@router.get("/")
def get_inbox(
    db: Session = Depends(get_db),
    current_user: schemas.RequestUser = Depends(auth_token.get_current_user),
):
    topics = db.query(models.Topic).all()

    return topics


@router.post("/")
def create_topic(request: schemas.CreateTopic, db: Session = Depends(get_db)):

    new_topic = models.Topic(topic_name=request.topic_name)
    db.add(new_topic)
    db.commit()
    return Response(status_code=status.HTTP_201_CREATED)
