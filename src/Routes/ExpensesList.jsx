import React from 'react';

// Function to format just the day with the correct suffix, accounting for timezone
const formatDayWithSuffix = (dateString) => {
  // Parse the date string safely, considering potential timezone offsets
  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
  const day = parseInt(dateParts[2], 10);

  // Create a new date object using the UTC constructor to avoid timezone issues
  const date = new Date(Date.UTC(year, month, day));

  // Logic to add the correct suffix to the day
  const dayWithSuffix = ((day) => {
    if (day > 3 && day < 21) return day + 'th';
    switch (day % 10) {
      case 1:  return day + "st";
      case 2:  return day + "nd";
      case 3:  return day + "rd";
      default: return day + "th";
    }
  })(date.getUTCDate());

  return dayWithSuffix;
}

const ExpensesList = ({ expenses }) => {
  // Sort expenses by date
  const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="expenses-list">
      <h2>Expenses List</h2>
      {sortedExpenses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map((expense, index) => {
              // Format each expense date to only include the day with its suffix
              const dayWithSuffix = formatDayWithSuffix(expense.date);

              return (
                <tr key={index}>
                  <td>{dayWithSuffix}</td>
                  <td>{expense.name}</td>
                  <td>${expense.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No expenses for this month.</p>
      )}
    </div>
  );
}

export default ExpensesList;
