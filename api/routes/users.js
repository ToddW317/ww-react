const express = require('express');
const User = require('../../src/models/User');
const Budget = require('../../src/models/Budget');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).send({ message: "Username is already taken" });
    }

    user = new User({
      username: req.body.username,
      password: req.body.password, // Storing password as plain text (not recommended)
    });

    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error registering new user." });
  }
});



// User login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || user.password !== req.body.password) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // Assuming you still generate a token for session management
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.send({ 
      token,
      user: {
        _id: user._id,
        username: user.username,
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Error during login." });
  }
});

// Endpoint to update a budget
router.patch('/budget/:id', async (req, res) => {
  const { id } = req.params; // Get the budget ID from the request URL
  const updates = req.body; // Get the updates from the request body

  try {
    const budget = await Budget.findById(id);

    if (!budget) {
      return res.status(404).send({ message: "Budget not found" });
    }

    // Check if the user making the request owns the budget
    if (req.user._id.toString() !== budget.user.toString()) {
      return res.status(403).send({ message: "Not authorized to update this budget" });
    }

    // Apply updates to the budget
    for (const key in updates) {
      budget[key] = updates[key];
    }

    await budget.save(); // Save the updated budget
    res.send(budget); // Send back the updated budget document
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
