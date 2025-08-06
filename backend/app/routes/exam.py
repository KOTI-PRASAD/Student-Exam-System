from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from database import cursor, db
from pydantic import BaseModel
import random

router = APIRouter()
security = HTTPBearer()

SECRET_KEY = "student-applications-secret"

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/start_exam")
def start_exam(username: str = Depends(verify_token)):
    cursor.execute("SELECT * FROM questions")
    questions = cursor.fetchall()
    selected = random.sample(questions, min(len(questions), 5))
    for q in selected:
        del q["correct_option"]
    return {"questions": selected}

class Answer(BaseModel):
    question_id: int
    selected_option: str

@router.post("/submit_exam")
def submit_exam(answers: list[Answer], username: str = Depends(verify_token)):
    score = 0
    for ans in answers:
        cursor.execute("SELECT correct_option FROM questions WHERE id = %s", (ans.question_id,))
        correct = cursor.fetchone()
        if correct and correct["correct_option"].lower() == ans.selected_option.lower():
            score += 1
    return {"username": username, "score": score, "total": len(answers)}
