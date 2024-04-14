import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    fetch('/api/users/register', {
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
      // Redirect user to login page after successful registration
      navigate('/login'); 
    })
    .catch(error => {
      // Process error response
      console.error("Registration failed with error:", error);
      setRegisterError(error.message || 'Registration failed');
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        {registerError && <p style={{ color: 'red' }}>{registerError}</p>}
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate('/login')}>Already have an account? Login</button>
    </div>
  );
}

export default Register;