from sqlalchemy.orm import Session
from . import models, schemas
from passlib.hash import bcrypt

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = bcrypt.hash(user.password)
    db_user = models.User(username=user.username, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if user and bcrypt.verify(password, user.password):
        return user
    return None

def create_question(db: Session, question: schemas.QuestionCreate):
    db_question = models.Question(**question.dict())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

def get_questions(db: Session):
    return db.query(models.Question).all()
