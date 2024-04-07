import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/monthly-budget">Monthly Budget</Link></li>
        <li><Link to="/savings">Savings</Link></li>
        <li><Link to="/income">Income</Link></li>
        <li><Link to="/credit-debt">Credit Snowball</Link></li>
        <li><Link to="/budget-per-paycheck">Budget/Paycheck</Link></li>
        {/* Add more links as needed */}
        
        {/* Conditionally render login/logout buttons */}
        {isAuthenticated ? (
          <li><button onClick={onLogout}>Logout</button></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
