import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartExam = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/exam');
  };

  return (
    <div style={styles.container}>
      {/* Optional Logo */}
      {/* <img src="/leadmasters-logo.png" alt="LeadMasters Logo" style={styles.logo} /> */}

      <h1 style={styles.heading}>Welcome to <span style={styles.brand}>LeadMasters</span> Exam</h1>
      <p style={styles.subheading}>
        🚀 Unlock your potential. Your journey starts here!
      </p>

      <button
        onClick={handleStart}
        style={styles.button}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        Start Exam
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(to bottom right, #f0f8ff, #e6f7ff)',
    height: '100vh',
    paddingTop: '60px',
  },
  logo: {
    height: '80px',
    marginBottom: '30px',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '10px',
    color: '#333',
  },
  brand: {
    color: '#800080',
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: '18px',
    marginBottom: '40px',
    color: '#555',
  },
  button: {
    padding: '15px 35px',
    fontSize: '18px',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
};

export default StartExam;
