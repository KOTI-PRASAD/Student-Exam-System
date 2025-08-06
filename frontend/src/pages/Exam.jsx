import React, { useState, useEffect } from "react";
import questions from "./questions";
import { useNavigate } from "react-router-dom";

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const navigate = useNavigate();

  const handleAnswerSelect = (option) => {
    const updated = [...selectedAnswers];
    updated[currentQuestion] = option;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < 9) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    const resultData = {
      selectedAnswers,
      questions: questions.slice(0, 10),
    };
    localStorage.setItem("examResult", JSON.stringify(resultData));
    navigate("/result");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          handleSubmit();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const question = questions[currentQuestion];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>📝 Exam Page</h2>
        <div style={styles.timer}>⏰ {formatTime(timeLeft)}</div>
      </div>

      <div style={styles.card}>
        <h3>
          Question {currentQuestion + 1}: {question.question}
        </h3>
        <div style={styles.options}>
          {question.options.map((opt, index) => {
            const isSelected = selectedAnswers[currentQuestion] === opt;
            return (
              <label
                key={index}
                style={{
                  ...styles.optionLabel,
                  backgroundColor: isSelected ? "#e0f7fa" : "#f8f8f8",
                  borderColor: isSelected ? "#00acc1" : "#ccc",
                }}
              >
                <input
                  type="radio"
                  name={`question_${currentQuestion}`}
                  value={opt}
                  checked={isSelected}
                  onChange={() => handleAnswerSelect(opt)}
                  style={styles.radio}
                />
                {opt}
              </label>
            );
          })}
        </div>
      </div>

      <div style={styles.buttonGroup}>
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          style={{
            ...styles.button,
            backgroundColor: currentQuestion === 0 ? "#ccc" : "#1976d2",
          }}
        >
          ⬅️ Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestion === 9}
          style={{
            ...styles.button,
            backgroundColor: currentQuestion === 9 ? "#ccc" : "#1976d2",
          }}
        >
          Next ➡️
        </button>
        <button onClick={handleSubmit} style={{ ...styles.button, backgroundColor: "#388e3c" }}>
          ✅ Submit
        </button>
      </div>
    </div>
  );
};

// ✅ Stylish Inline Styles (CSS-in-JS)
const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  timer: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#d32f2f",
  },
  card: {
    marginBottom: "30px",
  },
  options: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  optionLabel: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "2px solid #ccc",
    cursor: "pointer",
    transition: "0.3s",
  },
  radio: {
    marginRight: "10px",
    transform: "scale(1.2)",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
  },
  button: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Exam;
