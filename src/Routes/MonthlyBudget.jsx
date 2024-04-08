import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useGlobalState } from '../context/GlobalStateContext';
import ExpenseForm from './ExpenseForm';
import ExpensesList from './ExpensesList';
import IncomeForm from '../components/IncomeForm';
import IncomesList from './IncomesList';

const MonthlyBudget = () => {
  const { state } = useGlobalState();
  const [value, onChange] = useState(new Date());

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      // Convert the date to YYYY-MM-DD format for easy comparison
      const dateString = date.toISOString().slice(0, 10);
      const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));

      const visibleExpenses = state.monthlyBudget.expenses.filter(expense => {
        const [expenseYear, expenseMonth, expenseDay] = expense.date.split('-').map(num => parseInt(num, 10));

        // Direct comparison for non-recurring expenses
        if (expense.recurringFrequency === 'none') {
          return expense.date === dateString;
        }

        // Handle monthly recurring expenses
        if (expense.recurringFrequency === 'monthly') {
          // Check if the day matches and if the expense started before or in the current month
          if (expenseDay === day && (expenseYear < year || (expenseYear === year && expenseMonth <= month))) {
            return true;
          }
        } else if (expense.recurringFrequency === 'bi-weekly') {
          // Check if the day matches and if the expense started before or in the current month
          if (expenseDay === day && (expenseYear < year || (expenseYear === year && expenseMonth <= month))) {
            // Check if the day is an odd or even day of the month
            const isOddDay = day % 2 === 1;
            const isOddExpense = expenseDay % 2 === 1;
            if ((isOddDay && isOddExpense) || (!isOddDay && !isOddExpense)) {
              return true;
            }
          }
        } else if (expense.recurringFrequency === 'weekly') {
          // Check if the day matches and if the expense started before or in the current month
          if (expenseDay === day && (expenseYear < year || (expenseYear === year && expenseMonth <= month))) {
            // Calculate the difference in days between the expense and the current date
            const diffDays = Math.floor((date - new Date(expense.date)) / (1000 * 60 * 60 * 24));
            // Check if the difference in days is a multiple of 7
            if (diffDays % 7 === 0) {
              return true;
            }
          }
        }

        return false;
      });

      // Render a list of visible expenses for the day, if any
      if (visibleExpenses.length > 0) {
        return (
          <ul>
            {visibleExpenses.map((expense, index) => (
              <li key={index}>
                {expense.name}: ${expense.amount}
              </li>
            ))}
          </ul>
        );
      }
    }
    return null;
  };

  return (
    <div>
      <h1>Monthly Budget</h1>
      <Calendar onChange={onChange} value={value} tileContent={renderTileContent} />
      <h4>Add an Expense</h4>
      <ExpenseForm />
      <ExpensesList expenses={state.monthlyBudget.expenses} />
      <h4>Add an Income</h4>
      <IncomeForm />
      <IncomesList incomes={state.monthlyBudget.incomes} />
    </div>
  );
};

export default MonthlyBudget;
