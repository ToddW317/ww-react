import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

const IncomeForm = () => {
    const { dispatch } = useGlobalState();
    const [incomeSource, setIncomeSource] = useState('');
    const [amount, setAmount] = useState('');
    const [incomeType, setIncomeType] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_INCOME',
            payload: {
                id: Date.now(),
                source: incomeSource,
                amount: parseFloat(amount),
                type: incomeType,
                date,
            },
        });

        // Clear form fields
        setIncomeSource('');
        setAmount('');
        setIncomeType('');
        setDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={incomeSource}
                onChange={(e) => setIncomeSource(e.target.value)}
                placeholder="Source"
                required
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
            />
            <select
                value={incomeType}
                onChange={(e) => setIncomeType(e.target.value)}
                required
            >
                <option value="">Select Income Type</option>
                <option value="Paycheck">Paycheck</option>
                <option value="Payments">Payments</option>
                <option value="Misc">Misc</option>
                <option value="Other">Other</option>
            </select>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit">Add Income</button>
        </form>
    );
};

export default IncomeForm;
