# Student Exam System
A full-stack application that allows students to register, log in, and take a timed JavaScript multiple-choice test. It selects 5 random questions from a larger question pool, runs a countdown timer, and displays the final score upon submission. The app is secure, responsive, and built using modern technologies with proper structure and best practices.



# Features
- Student registration and login using JWT authentication
- JavaScript-themed multiple-choice exam (5 random questions from a pool)
- 30-minute countdown timer
- Score calculation and display
- Clean and responsive UI using React
- Backend with FastAPI and SQL (SQLite/PostgreSQL/MySQL)

# HOW IT APPEARS

![image alt](https://github.com/KOTI-PRASAD/Student-Exam-System/blob/2802711683cfc0bdf68b116b34c28984ac243b0f/Screenshot%202025-08-06%20185147.png)
![image alt](https://github.com/KOTI-PRASAD/Student-Exam-System/blob/c831863394947b2592c974f5568e0ae7d961d49c/Screenshot%202025-08-06%20185202.png)

![image alt](https://github.com/KOTI-PRASAD/Student-Exam-System/blob/3741e4d0fb8ac7ae5565118f6a59b7fda407cde7/Screenshot%202025-08-06%20185217.png)

![image alt](https://github.com/KOTI-PRASAD/Student-Exam-System/blob/e45cfba0828a629c30cde4f2b30b0ce9714d40e1/Screenshot%202025-08-06%20192126.png)


# TECH STACK
💻 Frontend:
React.js – for building the UI

Tailwind CSS – for styling

Axios – for making API calls to the backend

JavaScript (JSX) – core language used with React

🖥️ Backend:
Python – programming language

FastAPI – web framework to build REST APIs

SQL – database layer (could be SQLite, PostgreSQL, or MySQL)

SQLAlchemy – ORM (Object Relational Mapper) for DB operations

JWT (JSON Web Tokens) – for authentication

Pydantic – for data validation and request/response schemas

Uvicorn – ASGI server to run the FastAPI app

🗄️ Database:
SQL Database (most likely SQLite or PostgreSQL depending on your config)


# PROJECT STRUCTURE 
Student Applications/
│
├── backend/                          # FastAPI backend
│   ├── main.py                       # Entry point of FastAPI app
│   ├── database.py                   # DB connection setup
│   ├── models.py                     # SQLAlchemy models (User, Question, etc.)
│   ├── schemas.py                    # Pydantic schemas for request/response
│   ├── auth/                         # JWT authentication logic
│   │   ├── auth_handler.py
│   │   └── auth_bearer.py
│   ├── routes/                       # All route handlers
│   │   ├── user_routes.py
│   │   └── exam_routes.py
│   ├── utils/                        # Utility functions (e.g., scoring, timer)
│   └── requirements.txt              # Python dependencies
│
├── frontend/                         # React frontend
│   ├── public/                       # Static files
│   ├── src/
│   │   ├── components/               # Reusable UI components (Navbar, Timer, etc.)
│   │   ├── pages/                    # Page components (Login, Register, Exam)
│   │   ├── services/                 # Axios API calls to backend
│   │   ├── App.jsx                   # Main app component with routes
│   │   └── index.js                  # React entry point
│   └── package.json                  # Frontend dependencies & scripts
│
├── README.md                         # Project documentation
└── .gitignore    
