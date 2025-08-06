// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StartExam from "./pages/StartExam";
import Exam from "./pages/Exam"; // We'll create this next
import Result from "./pages/Result";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/start-exam" element={<StartExam />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default App;
