import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const IncomePage = () => {
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleIncomeSubmit = (event) => {
    event.preventDefault();
    const { incomeName, incomeDate, incomeAmount, incomeColor } = event.target.elements;
    const newEntry = {
      id: incomeEntries.length + 1,
      name: incomeName.value,
      date: incomeDate.value, // Store as YYYY-MM-DD string
      amount: parseFloat(incomeAmount.value),
      color: incomeColor.value,
    };
    setIncomeEntries([...incomeEntries, newEntry]);
    console.log('New Entry Added:', newEntry); // Debugging log
  };

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().slice(0, 10);
      const dayIncomes = incomeEntries.filter(income => income.date === formattedDate);
      
      // Debugging log
      console.log('Rendering incomes for date:', formattedDate, dayIncomes);

      return (
        dayIncomes.length > 0 && (
          <ul style={{ listStyleType: 'none', padding: '4px', margin: 0, backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            {dayIncomes.map(income => (
              <li key={income.id} style={{ color: income.color }}>
                {income.name}: ${income.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        )
      );
    }
    return null;
  };

  // Function to determine if a date is in the selected month and year
  const isInSelectedMonth = (date) => {
    const incomeDate = new Date(date);
    return incomeDate.getFullYear() === selectedDate.getFullYear() &&
           incomeDate.getMonth() === selectedDate.getMonth();
  };

  // Calculate total income for the selected month
  const totalIncomeForMonth = incomeEntries
  .filter(income => {
    const incomeDate = new Date(income.date + 'T00:00'); // Ensure comparison at start of day, neutralizing timezone effects.
    return incomeDate.getFullYear() === selectedDate.getFullYear() &&
           incomeDate.getMonth() === selectedDate.getMonth();
  })
  .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{ padding: '20px' }}>
      <Calendar onChange={setSelectedDate} value={selectedDate} tileContent={renderTileContent} />
      <div style={{ marginTop: '20px' }}>
        <form onSubmit={handleIncomeSubmit}>
          {/* Form inputs */}
          <input type="text" name="incomeName" placeholder="e.g., Paycheck" required />
          <input type="date" name="incomeDate" required />
          <input type="number" name="incomeAmount" placeholder="Amount" step="0.01" required />
          <input type="color" name="incomeColor" required />
          <button type="submit">Add Income</button>
        </form>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Income Details</h3>
        <ul>
          {incomeEntries.filter(income => isInSelectedMonth(income.date)).map(income => (
            <li key={income.id} style={{ color: income.color }}>
              {income.name}: ${income.amount.toFixed(2)}
            </li>
          ))}
        </ul>
        <p><strong>Total Income for {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}: ${totalIncomeForMonth.toFixed(2)}</strong></p>
      </div>
    </div>
  );
};

export default IncomePage;
