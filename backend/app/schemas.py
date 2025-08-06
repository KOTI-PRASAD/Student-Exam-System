from pydantic import BaseModel
from typing import Optional, List


# ========== User Schemas ==========

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True


# ========== Question Schemas ==========

class QuestionBase(BaseModel):
    question_text: str
    option1: str
    option2: str
    option3: str
    option4: str
    correct_option: int

class QuestionCreate(QuestionBase):
    pass

class Question(QuestionBase):
    id: int

    class Config:
        orm_mode = True


# ========== Token Schemas ==========

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None


# ========== Login Schemas ==========

class LoginData(BaseModel):
    username: str
    password: str


# ========== Response Models (Optional) ==========

class ShowUser(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True
