import React, { useState } from 'react';
import MyNavbar from './components/navbar.js';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation example
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    // TODO: Add authentication logic here
    alert('Login submitted!');
  };

  return (
    <div className="LoginPage">
      <MyNavbar />
      <div className="LoginContainer">
        <img src="/LoginLogo.png" alt="InvestiSmart Logo" className="LoginLogo" />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Username:</label><br />
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label><br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="LoginError">{error}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;