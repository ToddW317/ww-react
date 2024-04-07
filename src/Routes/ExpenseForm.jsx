import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

const ExpenseForm = () => {
    const { addExpense } = useGlobalState();
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurringFrequency, setRecurringFrequency] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addExpense({
            name: expenseName, 
            amount, 
            isRecurring, 
            recurringFrequency, 
            date
        });
        
    // Clear form fields
    setExpenseName('');
    setAmount('');
    setIsRecurring(false);
    setRecurringFrequency('');
    setDate('');
};

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Expense Name:
                <input type="text" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
            </label>
            <label>
                Amount:
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </label>
            <label>
                Recurring:
                <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />
            </label>
            {isRecurring && (
                <label>
                    Frequency:
                    <select value={recurringFrequency} onChange={(e) => setRecurringFrequency(e.target.value)}>
                        <option value="weekly">Weekly</option>
                        <option value="bi-weekly">Bi-Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </label>
            )}
            <label>
                Date:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;
