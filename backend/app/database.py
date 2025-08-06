from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Replace these credentials if needed
DB_USER = "kotiprasad"
DB_PASSWORD = "kp@12345"
DB_HOST = "localhost"
DB_PORT = "3306"
DB_NAME = "student_applications"

SQLALCHEMY_DATABASE_URL = (
    f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
