from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    new_user = models.User(username=user.username, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@router.put("/update-password")
def update_password(data: schemas.UserUpdatePassword, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == data.username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.password = data.new_password
    db.commit()
    return {"message": "Password updated successfully"}
