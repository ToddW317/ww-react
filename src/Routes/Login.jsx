import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => Promise.reject(data));
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // Redirect user to homepage or dashboard after successful login
      navigate('/');
    })
    .catch(error => {
      console.error("Login failed with error:", error);
      setLoginError(error.message || 'Login failed');
    });
  };


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/register')}>Don't have an account? Register</button>
    </div>
  );
}

export default Login;







