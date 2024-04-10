// src/components/Register.js
import React, { useState } from 'react';
import axios from '../axios'; // Import the Axios instance

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/users/register', { username, password });
      console.log(response.data);
      alert(response.data.message); // Show success message
      // Redirect user or clear form here
    } catch (error) {
      console.error(error.response.data); // Handle error
      alert(error.response.data.message); // Show error message
    }
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
