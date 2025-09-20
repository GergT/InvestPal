import React, { useState } from 'react';
import './login.css';

function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!username || !password) {
          setError('Please enter both username and password.');
          return;
      }
      setError('');

      try {
          const res = await fetch("http://localhost:5000/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include", 
              body: JSON.stringify({ username, password }),
          });

              if (!res.ok) {
              const data = await res.json();
              setError(data.message || "Login failed");
              return;
          }

          // success code here
          const data = await res.json();
          console.log("My data returned from backend")
          console.log(data);
          localStorage.setItem("token", data.token);
          window.location.href = "/feed";
          

      } catch (err) {
          console.error(err);
          setError("Something went wrong, try again.");
      }
    };

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <img src="/LoginLogo.png" alt="InvestiSmart Logo" className="LoginLogo" />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label><br />
            <input
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
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