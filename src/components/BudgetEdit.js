import React, { useState } from 'react';

function BudgetEdit({ budgetId, token }) {
  const [budgetData, setBudgetData] = useState({}); // State to hold budget data

  // Function to update budget
  const updateBudget = async (updatedData) => {
    try {
      const response = await fetch(`/api/budget/${budgetId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Assuming you're using JWT tokens for auth
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update budget');
      }

      const updatedBudget = await response.json();
      console.log('Budget updated:', updatedBudget);
      setBudgetData(updatedBudget); // Update the local state with the updated budget
      // Optionally, navigate to a different view or show a success message
    } catch (error) {
      console.error('Error updating budget:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  // Your component logic for rendering the budget form and handling form submissions
  
  return (
    <div>
      {/* Your form and UI elements for editing the budget */}
      {/* Include a save button or similar that calls updateBudget when clicked */}
    </div>
  );
}
