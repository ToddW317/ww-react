import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ExpenseModal = ({ isOpen, onRequestClose, onSaveExpense }) => {
  const [expense, setExpense] = useState({ name: '', amount: 0, recurring: 'none' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveExpense(expense);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Expense Name" value={expense.name} onChange={handleChange} />
        <input name="amount" type="number" placeholder="Amount" value={expense.amount} onChange={handleChange} />
        <select name="recurring" value={expense.recurring} onChange={handleChange}>
          <option value="none">Non-Recurring</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button type="submit">Save Expense</button>
      </form>
    </Modal>
  );
};

export default ExpenseModal;
