const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  allocatedAmount: { type: Number, default: 0 },
  spentAmount: { type: Number, default: 0 }
});

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  totalIncome: { type: Number, default: 0 },
  totalExpense: { type: Number, default: 0 },
  categories: [categorySchema],
  incomes: [incomeSchema],
  expenses: [expenseSchema],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  notes: String // Optional field for any notes the user might want to add
}, { timestamps: true }); // This option adds createdAt and updatedAt fields

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;
