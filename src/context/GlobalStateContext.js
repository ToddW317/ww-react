// In /src/context/GlobalStateContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Define the context
const GlobalStateContext = createContext();

// Initial state
const initialState = {
  user: {}, // User information
  monthlyBudget: [], // Monthly budget details
  income: [], // Income details
  savings: {}, // Savings goals and progress
  creditDebt: [], // Credit card debts
};

// Reducer function to handle state updates
const globalStateReducer = (state, action) => {
  switch (action.type) {
    // Define cases to handle different actions
    default:
      return state;
  }
};

// Context Provider component
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook for using global state context
export const useGlobalState = () => useContext(GlobalStateContext);
