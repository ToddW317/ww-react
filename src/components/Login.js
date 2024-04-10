import React, { useState } from 'react';
import axios from '../axios'; // Import the Axios instance

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('/users/login', { username, password });
      console.log(response.data);
      // On successful login, save the token to localStorage
      localStorage.setItem('token', response.data.token);
      alert("Logged in successfully!");
      // Redirect user or update UI to reflect login
    } catch (error) {
      console.error(error.response.data); // Handle error
      alert(error.response.data.message); // Show error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
