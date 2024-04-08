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
      if (action.payload.category === 'Credit Card') {
        const cardToUpdate = state.creditDebt.find(card => card.name === action.payload.name);
        if (cardToUpdate) {
          const updatedBalance = cardToUpdate.balance + action.payload.amount; // Adding expense to the balance
          return globalStateReducer(state, { type: 'UPDATE_CREDIT_DEBT', payload: { ...cardToUpdate, balance: updatedBalance } });
        }
      }
      // For non-credit card expenses, just add them normally
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
      case 'UPDATE_EXPENSES':
        return {
          ...state,
          monthlyBudget: {
            ...state.monthlyBudget,
            expenses: action.payload,
          },
        };
        case 'ADD_CREDIT_DEBT': // Action to add a new credit card debt
        return {
          ...state,
          creditDebt: [...state.creditDebt, action.payload],
        };
      case 'UPDATE_CREDIT_DEBT': // Action to update an existing credit card's balance
        const updatedCreditDebt = state.creditDebt.map(debt => {
          if (debt.id === action.payload.id) {
            return { ...debt, balance: action.payload.balance };
          }
          return debt;
        });
        return {
          ...state,
          creditDebt: updatedCreditDebt,
        };
    // Include other actions as necessary
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  // Methods to update the state
  const addExpense = expense => dispatch({ type: 'ADD_EXPENSE', payload: expense, paid: false });
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
