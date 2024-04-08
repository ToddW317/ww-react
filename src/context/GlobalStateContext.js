import React, { createContext, useContext, useReducer } from 'react';

const GlobalStateContext = createContext();

const initialState = {
  user: {},
  monthlyBudget: {
    expenses: [],
    incomes: [],
    categories: [{ name: 'Housing' }, { name: 'Transportation' }, { name: 'Food' }, { name: 'Utilities' }, { name: 'Insurance' }, { name: 'Healthcare' }, { name: 'Savings' }, { name: 'Personal' }, { name: 'Recreation' }, { name: 'Credit Card' }, { name: 'Miscellaneous' }],
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
                incomes: [...state.monthlyBudget.incomes, action.payload],
            },
        };
    case 'REMOVE_INCOME':
      return {
        ...state,
        monthlyBudget: {
          ...state.monthlyBudget,
          incomes: state.monthlyBudget.incomes.filter(incomes => incomes.id !== action.payload),
        },
      };
      case 'ADD_CATEGORY':
        return {
          ...state,
          monthlyBudget: {
            ...state.monthlyBudget,
            categories: [...state.monthlyBudget.categories, action.payload],
          },
        };
      case 'REMOVE_CATEGORY':
        return {
          ...state,
          monthlyBudget: {
            ...state.monthlyBudget,
            categories: state.monthlyBudget.categories.filter(category => category.id !== action.payload),
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
  const addIncome = incomes => dispatch({ type: 'ADD_INCOME', payload: incomes });
  const removeIncome = incomesId => dispatch({ type: 'REMOVE_INCOME', payload: incomesId });
  const addCategory = category => dispatch({ type: 'ADD_CATEGORY', payload: category });
  const removeCategory = categoryId => dispatch({ type: 'REMOVE_CATEGORY', payload: categoryId });

  // Add more methods as necessary

  return (
    <GlobalStateContext.Provider value={{ state, addExpense, removeExpense, addIncome, removeIncome, dispatch, addCategory, removeCategory }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
