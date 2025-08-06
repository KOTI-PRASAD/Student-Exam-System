import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();

      // Optionally store token in localStorage
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', username); // optional

      navigate('/start-exam');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
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
        <button type="submit" style={styles.button}>Login</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
      <p>Don't have an account? <span style={styles.link} onClick={() => navigate('/register')}>Register here</span></p>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column' },
  input: { marginBottom: '10px', padding: '8px' },
  button: { padding: '10px', backgroundColor: 'green', color: 'white', border: 'none' },
  error: { color: 'red' },
  link: { color: 'blue', cursor: 'pointer', textDecoration: 'underline' }
};

export default Login;
