import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav>
      <button className="toggle-button" onClick={toggleMenu}>☰</button>
      <ul style={{ display: isOpen ? 'block' : 'none' }}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/monthly-budget" onClick={() => setIsOpen(false)}>Monthly Budget</Link></li>
        <li><Link to="/savings" onClick={() => setIsOpen(false)}>Savings</Link></li>
        <li><Link to="/credit-debt" onClick={() => setIsOpen(false)}>Credit Snowball</Link></li>
        <li><Link to="/budget-per-paycheck" onClick={() => setIsOpen(false)}>Budget/Paycheck</Link></li>
        {isAuthenticated ? (
          <li><button onClick={() => { onLogout(); setIsOpen(false); }}>Logout</button></li>
        ) : (
          <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
