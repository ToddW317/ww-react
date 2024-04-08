import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { useGlobalState } from '../context/GlobalStateContext';

const BudgetPerPaycheck = () => {
    const { state } = useGlobalState();
    const [intervalData, setIntervalData] = useState([]);
    const [currentPeriodStart, setCurrentPeriodStart] = useState(moment().startOf('month'));

    const isRecurringExpenseInInterval = useCallback((expense, intervalStart, intervalEnd) => {
        const expenseDate = moment(expense.date);
        const intervalStartDate = intervalStart;
        const intervalEndDate = intervalEnd;

        // Check for monthly recurrence
        if (expense.recurringFrequency === 'monthly') {
            const dayOfMonthMatches = expenseDate.date() >= intervalStartDate.date() && expenseDate.date() <= intervalEndDate.date();
            const isBeforeOrDuringInterval = expenseDate.isSameOrBefore(intervalEndDate, 'day');

            return dayOfMonthMatches && isBeforeOrDuringInterval;
        }
        return false;
    }, []);

    const processStateData = useCallback(() => {
        const { monthlyBudget } = state;
        const firstIntervalStart = moment(currentPeriodStart).startOf('month');
        const firstIntervalEnd = moment(currentPeriodStart).date(15);
        const secondIntervalStart = moment(currentPeriodStart).date(16);
        const secondIntervalEnd = moment(currentPeriodStart).endOf('month');

        const intervalExpenses = monthlyBudget.expenses.filter(expense =>
            isRecurringExpenseInInterval(expense, firstIntervalStart, firstIntervalEnd) ||
            isRecurringExpenseInInterval(expense, secondIntervalStart, secondIntervalEnd)
        );

        const firstIntervalExpenses = intervalExpenses.filter(expense => moment(expense.date).date() <= 15);
        const secondIntervalExpenses = intervalExpenses.filter(expense => moment(expense.date).date() > 15);

        // Split incomes into intervals based on date
        const firstIntervalIncomes = monthlyBudget.incomes.filter(income => moment(income.date).date() <= 15);
        const secondIntervalIncomes = monthlyBudget.incomes.filter(income => moment(income.date).date() > 15);

        // Calculate totals for each interval
        const totalFirstIntervalIncome = firstIntervalIncomes.reduce((acc, curr) => acc + curr.amount, 0);
        const totalSecondIntervalIncome = secondIntervalIncomes.reduce((acc, curr) => acc + curr.amount, 0);

        const totalFirstIntervalExpenses = firstIntervalExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        const totalSecondIntervalExpenses = secondIntervalExpenses.reduce((acc, curr) => acc + curr.amount, 0);

        const remainingFirstInterval = totalFirstIntervalIncome - totalFirstIntervalExpenses;
        const remainingSecondInterval = totalSecondIntervalIncome - totalSecondIntervalExpenses;

        setIntervalData([
            {
                startDate: firstIntervalStart.format('MM/DD/YY'),
                endDate: firstIntervalEnd.format('MM/DD/YY'),
                incomes: firstIntervalIncomes,
                expenses: firstIntervalExpenses,
                totalIncome: totalFirstIntervalIncome,
                totalExpenses: totalFirstIntervalExpenses,
                remaining: remainingFirstInterval,
            },
            {
                startDate: secondIntervalStart.format('MM/DD/YY'),
                endDate: secondIntervalEnd.format('MM/DD/YY'),
                incomes: secondIntervalIncomes,
                expenses: secondIntervalExpenses,
                totalIncome: totalSecondIntervalIncome,
                totalExpenses: totalSecondIntervalExpenses,
                remaining: remainingSecondInterval,
            }
        ]);
    }, [state, currentPeriodStart, isRecurringExpenseInInterval]);

    useEffect(() => {
        processStateData();
    }, [processStateData]);

    const navigateToNextInterval = () => {
        setCurrentPeriodStart(currentPeriodStart.clone().add(1, 'months'));
    };

    const navigateToPreviousInterval = () => {
        setCurrentPeriodStart(currentPeriodStart.clone().subtract(1, 'months'));
    };
    const payExpense = (expenseId, intervalIndex) => {
        const updatedIntervals = [...intervalData];
        updatedIntervals[intervalIndex].expenses = updatedIntervals[intervalIndex].expenses.map(expense => {
            if (expense.id === expenseId) {
                return { ...expense, paid: true };
            }
            return expense;
        });
        setIntervalData(updatedIntervals);
    };

    return (
        <div className="bpp-container">
            <div className="navigation-controls">
                <button onClick={navigateToPreviousInterval}>← Previous</button>
                <button onClick={navigateToNextInterval}>Next →</button>
            </div>
            {intervalData.map((interval, index) => (
                <div key={index} className="interval">
                    <h2>Interval: {interval.startDate} to {interval.endDate}</h2>
                    <div>
                        <h3>Incomes</h3>
                        {interval.incomes.length > 0 ? (
                            <ul>
                                {interval.incomes.map((income, iIndex) => (
                                    <li key={iIndex} style={{ color: 'green' }}>
                                        {income.source} - ${income.amount.toFixed(2)} ({income.type})
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
                                    <li key={eIndex} style={{ textDecoration: expense.paid ? 'line-through' : 'none' }}>
                                        {expense.name}: ${expense.amount.toFixed(2)}
                                        {!expense.paid && (
                                            <button onClick={() => payExpense(expense.id, index)}>Pay</button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No expenses recorded for this period.</p>
                        )}
                    </div>
                    <hr />
                    <p>Total Income: ${interval.totalIncome.toFixed(2)}</p>
                    <p>Total Expenses: ${interval.totalExpenses.toFixed(2)}</p>
                    <p>Remaining Budget: ${interval.remaining.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
};

export default BudgetPerPaycheck;
