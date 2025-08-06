from sqlalchemy import Column, Integer, String, Text
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    password = Column(String(255))

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    question_text = Column(Text)
    option_a = Column(String(255))
    option_b = Column(String(255))
    option_c = Column(String(255))
    option_d = Column(String(255))
    correct_option = Column(String(1))  # A, B, C, or D
