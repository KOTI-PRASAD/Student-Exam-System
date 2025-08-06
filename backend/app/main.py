from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory user store
users: Dict[str, str] = {}

# Request body schema
class User(BaseModel):
    username: str
    password: str

# Home route
@app.get("/")
def read_root():
    return {"message": "Backend is running"}

# Register API
@app.post("/register")
def register(user: User):
    if user.username in users:
        return {"message": "Username already exists"}
    users[user.username] = user.password
    return {"message": "Registration successful"}

# Login API
@app.post("/login")
def login(user: User):
    if user.username not in users:
        return {"message": "Invalid username"}
    if users[user.username] != user.password:
        return {"message": "Incorrect password"}
    return {"message": "Login successful"}
