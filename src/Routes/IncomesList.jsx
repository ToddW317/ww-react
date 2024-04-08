import React from 'react';

const formatDayWithSuffix = (dateString) => {
  // Safety check to handle undefined dateString
  if (!dateString) {
    return 'No Date'; // Or any other fallback text you prefer
  }

  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
  const day = parseInt(dateParts[2], 10);
  const date = new Date(Date.UTC(year, month, day));

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

const IncomesList = ({ incomes = [] }) => {
  // Ensure incomes is always an array to prevent the "is not iterable" error
  const sortedIncomes = incomes.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="incomes-list">
      <h2>Incomes List</h2>
      {sortedIncomes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Source</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortedIncomes.map((income, index) => (
              <tr key={index}>
                <td>{formatDayWithSuffix(income.date)}</td>
                <td>{income.source}</td>
                {/* Guard against undefined amount */}
                <td>${income.amount ? income.amount.toFixed(2) : '0.00'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No incomes for this month.</p>
      )}
    </div>
  );
}

export default IncomesList;
