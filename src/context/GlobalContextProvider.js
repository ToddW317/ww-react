import React, { useReducer } from 'react';
import { GlobalStateProvider, useGlobalState } from './GlobalStateContext';

// Initial state
const initialState = {
  user: null,
  expenses: [],
  incomes: [],
  // Add other initial state values as needed
};

// Reducer function to update state based on action
function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    // Add other case statements for different actions
    default:
      return state;
  }
}

// Create a Provider component
export const GlobalStateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Value to be passed to consuming components
  const value = { state, dispatch };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
