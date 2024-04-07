// In App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Routes/HomePage';
import MonthlyBudget from './Routes/MonthlyBudget';
import Income from './Routes/Income';
import Navbar from './components/Navbar';
import Savings from './Routes/Savings';
import CreditDebt from './Routes/CreditDebt';
import BudgetperPaycheck from './Routes/BudgetperPaycheck';
import { GlobalStateProvider } from './context/GlobalStateContext';
import './App.css';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/monthly-budget" element={<MonthlyBudget />} />
          <Route path="/income" element={<Income />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/credit-debt" element={<CreditDebt />} />
          <Route path="/budget-per-paycheck" element={<BudgetperPaycheck />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
