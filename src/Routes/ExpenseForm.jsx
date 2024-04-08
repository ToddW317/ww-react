import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

const ExpenseForm = () => {
    const { state, dispatch } = useGlobalState();
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurringFrequency, setRecurringFrequency] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');

    const handleAddCategory = () => {
        const newCategoryName = prompt("Enter the name of the new category:");
        if (newCategoryName && !state.monthlyBudget.categories.find(cat => cat.name === newCategoryName)) {
            dispatch({ type: 'ADD_CATEGORY', payload: { name: newCategoryName } });
            setCategory(newCategoryName); // Automatically select the newly created category
        } else if (newCategoryName) {
            alert("Category already exists or invalid name.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newExpense = {
            id: Date.now(),
            name: expenseName,
            amount: parseFloat(amount),
            isRecurring,
            recurringFrequency,
            date,
            category,
        };
        dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
        
        // Clear form fields
        setExpenseName('');
        setAmount('');
        setIsRecurring(false);
        setRecurringFrequency('');
        setDate('');
        setCategory('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input type="text" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} placeholder='Expense Name' />
            </label>
            <label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' />
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
            <label>
                Category:
                <select
                    value={category}
                    onChange={(e) => {
                        if (e.target.value === "addNew") {
                            handleAddCategory();
                        } else {
                            setCategory(e.target.value);
                        }
                    }}
                >
                    <option value="">Select a Category</option>
                    {state.monthlyBudget.categories.map((cat, index) => (
                        <option key={index} value={cat.name}>{cat.name}</option>
                    ))}
                    <option value="addNew">Add New Category...</option>
                </select>
            </label>
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;
