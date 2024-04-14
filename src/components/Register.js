// src/components/Register.js
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
        // If response is not ok, get the error message from the response body
        return response.json().then(body => { throw new Error(body.message); });
      }
      return response.json();
    })
    .then(data => {
      alert(data.message);
      navigate('/login');
    })
    .catch(error => {
      console.error("Registration failed with error:", error);
      setRegisterError(error.message);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
  };

export default Register;











