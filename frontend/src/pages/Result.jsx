import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("examResult"));
    if (!savedData) {
      navigate("/exam");
      return;
    }

    const { selectedAnswers = [], questions = [] } = savedData;

    let correctCount = 0;
    const resultDetails = questions.map((q, index) => {
      const userAnswer = selectedAnswers[index] || "Not answered";
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        question: q.question,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });

    setScore(correctCount);
    setResults(resultDetails);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Exam Results</h2>

        <div style={styles.stats}>
          <p><strong>Total Questions:</strong> {results.length}</p>
          <p><strong>Correct Answers:</strong> ✅ {score}</p>
          <p><strong>Wrong Answers:</strong> ❌ {results.length - score}</p>
        </div>

        <hr style={styles.divider} />

        <div>
          {results.map((item, index) => (
            <div key={index} style={styles.questionBox}>
              <p><strong>Q{index + 1}:</strong> {item.question}</p>
              <p>
                <span style={styles.label}>Your Answer:</span>{" "}
                <span
                  style={{
                    color: item.isCorrect ? "#2e7d32" : "#d32f2f",
                    fontWeight: "bold",
                  }}
                >
                  {item.userAnswer}
                </span>
              </p>
              {!item.isCorrect && (
                <p>
                  <span style={styles.label}>Correct Answer:</span>{" "}
                  <span style={{ color: "#2e7d32", fontWeight: "bold" }}>
                    {item.correctAnswer}
                  </span>
                </p>
              )}
              <p style={item.isCorrect ? styles.correct : styles.incorrect}>
                {item.isCorrect ? "✅ Correct" : "❌ Incorrect"}
              </p>
              <hr style={styles.innerDivider} />
            </div>
          ))}
        </div>

        <button style={styles.button} onClick={() => navigate("/dashboard")}>
          🔙 Go to Dashboard
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "40px 20px",
  },
  card: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "28px",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  stats: {
    fontSize: "18px",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  divider: {
    margin: "20px 0",
    border: "none",
    height: "1px",
    backgroundColor: "#ddd",
  },
  innerDivider: {
    marginTop: "15px",
    border: "none",
    height: "1px",
    backgroundColor: "#eee",
  },
  questionBox: {
    marginBottom: "20px",
    backgroundColor: "#fafafa",
    padding: "15px",
    borderRadius: "8px",
  },
  correct: {
    color: "#2e7d32",
    fontWeight: "bold",
  },
  incorrect: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
  label: {
    fontWeight: "600",
    color: "#555",
  },
  button: {
    marginTop: "30px",
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    transition: "background-color 0.3s",
  },
};

export default Result;
