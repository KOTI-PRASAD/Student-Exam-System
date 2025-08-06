import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/register"><button>Register</button></Link>
      <Link to="/login"><button>Login</button></Link>
    </div>
  );
}

export default Home;
