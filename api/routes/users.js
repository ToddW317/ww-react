const express = require('express');
const User = require('../../src/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  console.log("Register endpoint hit with data:", req.body); // Log the incoming request data
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).send({ message: "Username is already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error); // Log any errors
    res.status(400).send(error);
  }
});


// User login
router.post('/login', async (req, res) => {
  console.log("Login endpoint hit with data:", req.body); // Log the incoming request data
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log("Found user:", user); // Log the found user
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    console.log("Comparing", req.body.password, "with hashed", user.password);
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("Password match:", isMatch);
    
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    // Send back the token and user info (excluding password)
    res.send({ 
      token,
      user: {
        _id: user._id,
        username: user.username,
        // Add other user fields you might want to send back
      }
    });
  } catch (error) {
    console.error("Login error:", error); // Log any errors
    res.status(500).send(error);
  }
});


module.exports = router;
