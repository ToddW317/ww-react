import React, { useState } from 'react';
import '../css/savings.css';

const Savings = () => {
  const [savingsGoals, setSavingsGoals] = useState([
    { id: 1, name: "Emergency Fund", targetAmount: 1000, currentAmount: 500 },
    { id: 2, name: "Vacation", targetAmount: 2000, currentAmount: 600 },
  ]);

  const addSavingsGoal = (name, targetAmount) => {
    const newGoal = {
      id: savingsGoals.length + 1,
      name,
      targetAmount,
      currentAmount: 0,
    };
    setSavingsGoals([...savingsGoals, newGoal]);
  };

  const handleAddGoalSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const targetAmount = parseFloat(event.target.targetAmount.value);
    if (name && targetAmount) {
      addSavingsGoal(name, targetAmount);
      event.target.reset(); // Reset form fields
    }
  };

  const handleUpdateAmount = (id, newAmount) => {
    setSavingsGoals(savingsGoals.map(goal =>
      goal.id === id ? { ...goal, currentAmount: newAmount } : goal
    ));
  };

  return (
    <div>
      <h2>Savings Goals</h2>
      <ul>
        {savingsGoals.map((goal) => (
          <li key={goal.id}>
            {goal.name}: ${goal.currentAmount} / ${goal.targetAmount}
            <form onSubmit={(e) => {
              e.preventDefault();
              const newAmount = parseFloat(e.target.elements['amount-' + goal.id].value);
              handleUpdateAmount(goal.id, newAmount);
            }}>
              <input
                type="number"
                name={`amount-${goal.id}`}
                placeholder="Update amount"
                min="0"
                step="0.01"
              />
              <button type="submit">Update</button>
            </form>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddGoalSubmit}>
        <input type="text" name="name" placeholder="Goal Name" required />
        <input type="number" name="targetAmount" placeholder="Target Amount" required min="1" />
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
};

export default Savings;
