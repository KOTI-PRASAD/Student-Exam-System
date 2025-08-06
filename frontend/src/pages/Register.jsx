import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
      setError('Username already exists!');
      return;
    }

    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please login.');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
      <p>Already have an account? <span style={styles.link} onClick={() => navigate('/login')}>Login here</span></p>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column' },
  input: { marginBottom: '10px', padding: '8px' },
  button: { padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none' },
  error: { color: 'red' },
  link: { color: 'blue', cursor: 'pointer', textDecoration: 'underline' }
};

export default Register;
