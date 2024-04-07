import React, { createContext, useContext, useReducer } from 'react';

const GlobalStateContext = createContext();

const initialState = {
  user: {},
  monthlyBudget: {
    expenses: [],
    income: [],
  },
  savings: {},
  creditDebt: [],
};

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        monthlyBudget: {
          ...state.monthlyBudget,
          expenses: [...state.monthlyBudget.expenses, action.payload],
        },
      };
    case 'REMOVE_EXPENSE':
      return {
        ...state,
        monthlyBudget: {
          ...state.monthlyBudget,
          expenses: state.monthlyBudget.expenses.filter(expense => expense.id !== action.payload),
        },
      };
    case 'ADD_INCOME':
      return {
        ...state,
        monthlyBudget: {
          ...state.monthlyBudget,
          income: [...state.monthlyBudget.income, action.payload],
        },
      };
    case 'REMOVE_INCOME':
      return {
        ...state,
        monthlyBudget: {
          ...state.monthlyBudget,
          income: state.monthlyBudget.income.filter(income => income.id !== action.payload),
        },
      };
    // Include other actions as necessary
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  // Methods to update the state
  const addExpense = expense => dispatch({ type: 'ADD_EXPENSE', payload: expense });
  const removeExpense = expenseId => dispatch({ type: 'REMOVE_EXPENSE', payload: expenseId });
  const addIncome = income => dispatch({ type: 'ADD_INCOME', payload: income });
  const removeIncome = incomeId => dispatch({ type: 'REMOVE_INCOME', payload: incomeId });

  // Add more methods as necessary

  return (
    <GlobalStateContext.Provider value={{ state, addExpense, removeExpense, addIncome, removeIncome }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
