import React from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

const BudgetPerPaycheck = () => {
  const { state } = useGlobalState(); // Use the global state context
  
  // Use state.monthlyBudget.categories and other necessary parts here for budgeting
  
  return (
    <div>
      <h2>Budget per Paycheck</h2>
      {/* Implement UI for displaying and managing paycheck-based budgeting here */}
    </div>
  );
};

export default BudgetPerPaycheck;
