import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log("Attempting to register with:", { username, password });

    try {
      await axios.post('/api/users/register', {
        username,
        password,
      });
      // Redirect user to login page after successful registration
      navigate('/login'); 
    } catch (error) {
      if (error.response) {
        // Process error response
        console.error("Registration failed with error:", error);
        setRegisterError(error.response.data.message);
      } else {
        // General error handling
        console.error('Registration error:', error);
      }
    }
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
