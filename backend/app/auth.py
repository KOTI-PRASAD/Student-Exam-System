from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import cursor, db
import jwt
import datetime

router = APIRouter()

SECRET_KEY = "student-applications-secret"

class User(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(user: User):
    cursor.execute("SELECT * FROM users WHERE username = %s", (user.username,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Username already exists")
    
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (user.username, user.password))
    db.commit()
    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: User):
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (user.username, user.password))
    result = cursor.fetchone()
    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    payload = {
        "sub": user.username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return {"access_token": token}
