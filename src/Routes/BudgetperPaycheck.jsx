import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

const BudgetPerPaycheck = () => {
    const { state, dispatch } = useGlobalState();
    const [intervalData, setIntervalData] = useState([]); // To store processed interval data

    useEffect(() => {
        // This function should process state data to fit into the interval structure
        processStateData();
    }, [state]);

    const processStateData = () => {
        const { monthlyBudget } = state; // Assuming this is how you access your global state
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const firstIntervalEnd = new Date(currentYear, currentMonth, 15);
        const monthEnd = new Date(currentYear, currentMonth + 1, 0); // Last day of the current month
    
        // Helper to check if a date falls within the first interval
        const isInFirstInterval = (date) => {
            const checkDate = new Date(date);
            return checkDate <= firstIntervalEnd;
        };
    
        // Splitting incomes and expenses into intervals
        const firstIntervalIncomes = monthlyBudget.incomes.filter(income => isInFirstInterval(income.date));
        const secondIntervalIncomes = monthlyBudget.incomes.filter(income => !isInFirstInterval(income.date));
    
        const firstIntervalExpenses = monthlyBudget.expenses.filter(expense => isInFirstInterval(expense.date));
        const secondIntervalExpenses = monthlyBudget.expenses.filter(expense => !isInFirstInterval(expense.date));
    
        // Calculating totals for each interval
        const totalFirstIntervalIncome = firstIntervalIncomes.reduce((acc, curr) => acc + curr.amount, 0);
        const totalSecondIntervalIncome = secondIntervalIncomes.reduce((acc, curr) => acc + curr.amount, 0);
    
        const totalFirstIntervalExpenses = firstIntervalExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        const totalSecondIntervalExpenses = secondIntervalExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    
        // Preparing interval data for the state
        const intervals = [
            {
                startDate: new Date(currentYear, currentMonth, 1).toISOString().slice(0, 10),
                endDate: firstIntervalEnd.toISOString().slice(0, 10),
                incomes: firstIntervalIncomes,
                expenses: firstIntervalExpenses,
                totalIncome: totalFirstIntervalIncome,
                totalExpenses: totalFirstIntervalExpenses,
                remaining: totalFirstIntervalIncome - totalFirstIntervalExpenses,
            },
            {
                startDate: new Date(currentYear, currentMonth, 16).toISOString().slice(0, 10),
                endDate: monthEnd.toISOString().slice(0, 10),
                incomes: secondIntervalIncomes,
                expenses: secondIntervalExpenses,
                totalIncome: totalSecondIntervalIncome,
                totalExpenses: totalSecondIntervalExpenses,
                remaining: totalSecondIntervalIncome - totalSecondIntervalExpenses,
            }
        ];
    
        setIntervalData(intervals); // Assuming you have a state setter named setIntervalData
    };
    
    

    const addIncome = (income) => {
        // Assuming income has { source, amount, date }
        dispatch({ type: 'ADD_INCOME', payload: income });
        processStateData();
    };

    const payExpenses = (intervalIndex) => {
        // Logic to mark expenses as paid in the specified interval
        // This might involve updating the global state and then reprocessing the interval data
    };

    // Render logic goes here...
    // Inside BudgetPerPaycheck's return statement

// Inside BudgetPerPaycheck's return statement
return (
    <div className="bpp-container">
        {intervalData.map((interval, index) => (
            <div key={index} className="interval">
                <h2>Interval: {interval.startDate} to {interval.endDate}</h2>
                <div>
                    <h3>Incomes</h3>
                    {interval.incomes.length > 0 ? (
                        <ul>
                            {interval.incomes.map((income, iIndex) => (
                                <li key={iIndex} style={{ color: 'green' }}>
                                    {income.source} - ${income.amount?.toFixed(2)} ({income.type})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No incomes recorded for this period.</p>
                    )}
                </div>
                <div>
                    <h3>Expenses</h3>
                    {interval.expenses.length > 0 ? (
                        <ul>
                            {interval.expenses.map((expense, eIndex) => (
                                <li key={eIndex}>{expense.name}: ${expense.amount?.toFixed(2)}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No expenses recorded for this period.</p>
                    )}
                </div>
                <hr />
                <p>Total Income: ${interval.totalIncome?.toFixed(2)}</p>
                <p>Total Expenses: ${interval.totalExpenses?.toFixed(2)}</p>
                <p>Remaining Budget: ${interval.remaining?.toFixed(2)}</p>
            </div>
        ))}
    </div>
);
}


export default BudgetPerPaycheck;