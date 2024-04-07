import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const CreditDebt = () => {
  const [debts, setDebts] = useState([]);
  const [editDebtId, setEditDebtId] = useState(null);
  const [formData, setFormData] = useState({ name: '', balance: '', interestRate: '' });
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(null);

  const debtSnowballList = debts.sort((a, b) => a.balance - b.balance);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const data = {
    labels: debts.map(debt => debt.name),
    datasets: [{
      label: 'Debt Balances',
      data: debts.map(debt => debt.balance),
      backgroundColor: [   '#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ff8744',
      '#ff4848', '#56ff48', '#4D4DFF', '#FF6B6B', '#FFD93D',
      '#6BFFEA', '#C06C84', '#F67280', '#355C7D', '#6C5B7B',
      '#F8B195', '#99B898', '#FECEAB', '#FF847C', '#E84A5F',],
      hoverOffset: 4
    }]
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newDebt = {
      id: editDebtId ? editDebtId : debts.length + 1,
      ...formData,
      balance: parseFloat(formData.balance),
      interestRate: parseFloat(formData.interestRate),
    };

    if (editDebtId) {
      setDebts(debts.map(debt => debt.id === editDebtId ? newDebt : debt));
      setEditDebtId(null); // Exit edit mode
    } else {
      setDebts([...debts, newDebt]);
    }
    setFormData({ name: '', balance: '', interestRate: '' }); // Reset form
  };

  const handleRemoveDebt = (id) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const handleEditDebt = (debt) => {
    setEditDebtId(debt.id);
    setFormData({
      name: debt.name,
      balance: debt.balance.toString(),
      interestRate: debt.interestRate.toString(),
    });
  };

  const handlePaymentSimulation = () => {
    if (!monthlyPayment || monthlyPayment <= 0) return;

    // Creating a deep copy of debts for simulation
    let simulatedDebts = JSON.parse(JSON.stringify(
        selectedCardId
            ? debts.filter(debt => debt.id === parseInt(selectedCardId))
            : debts.sort((a, b) => a.balance - b.balance)
    ));

    let totalMonths = 0;
    let totalInterestPaid = 0; // Initialize total interest paid

    while (simulatedDebts.some(debt => debt.balance > 0)) {
        simulatedDebts.forEach(debt => {
            const monthlyInterest = (debt.interestRate / 12) * debt.balance / 100;
            totalInterestPaid += monthlyInterest; // Accumulate interest paid
            const availablePayment = Math.min(debt.balance + monthlyInterest, monthlyPayment);
            debt.balance -= (availablePayment - monthlyInterest);
        });

        // Remove fully paid debts and increment the month
        simulatedDebts = simulatedDebts.filter(debt => debt.balance > 0.01);
        totalMonths++;
    }

    alert(`Estimated time to pay off: ${totalMonths} month(s). Total interest paid: $${totalInterestPaid.toFixed(2)}`);
};

  return (
<div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '20px',
  paddingBottom: '40px', // Increase padding at the bottom
}}>
      <h2>{editDebtId ? 'Edit' : 'Add'} Your Credit Card Debt</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Credit Card Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="balance"
          placeholder="Outstanding Balance"
          value={formData.balance}
          onChange={handleInputChange}
          step="0.01"
          required
        />
        <input
          type="number"
          name="interestRate"
          placeholder="Interest Rate (%)"
          value={formData.interestRate}
          onChange={handleInputChange}
          step="0.01"
          required
        />
        <button type="submit">{editDebtId ? 'Save Changes' : 'Add Debt'}</button>
        {editDebtId && <button type="button" onClick={() => setEditDebtId(null)}>Cancel</button>}
      </form>

      <ul>
        {debts.map(debt => (
          <li key={debt.id}>
            {debt.name}: ${debt.balance.toFixed(2)} at {debt.interestRate.toFixed(2)}%
            <button onClick={() => handleEditDebt(debt)}>Edit</button>
            <button onClick={() => handleRemoveDebt(debt.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <div>
      <h3>Payment Simulation</h3>
      <select onChange={(e) => setSelectedCardId(e.target.value)} value={selectedCardId}>
        <option value="">Select a Card</option>
        {debts.map(debt => (
          <option key={debt.id} value={debt.id}>{debt.name}</option>
        ))}
      </select>
      <input
        type="number"
        value={monthlyPayment}
        onChange={(e) => setMonthlyPayment(e.target.value)}
        placeholder="Monthly Payment Amount"
      />
      <button onClick={handlePaymentSimulation}>Simulate Payments</button>
    </div>
    <div style={{ width: '400px', height: '400px', marginBottom: '20px' }}>
    <h3>Debt Distribution</h3>
    <Pie data={data} />
  </div>
    {/* Debt Snowball Section */}
    <div style={{ marginTop: '20px' }}>
        <h3>Debt Snowball Plan</h3>
        <p>Debts listed from smallest to largest balance:</p>
        <ol>
          {debtSnowballList.map(debt => (
            <li key={debt.id}>
              {debt.name}: ${debt.balance.toFixed(2)}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default CreditDebt;
