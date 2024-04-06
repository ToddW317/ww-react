// In App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Routes/HomePage';
import MonthlyBudget from './Routes/MonthlyBudget';
import Income from './Routes/Income';
import Savings from './Routes/Savings';
import CreditDebt from './Routes/CreditDebt';
import { GlobalStateProvider } from './context/GlobalStateContext';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/monthly-budget" element={<MonthlyBudget />} />
          <Route path="/income" element={<Income />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/credit-debt" element={<CreditDebt />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
