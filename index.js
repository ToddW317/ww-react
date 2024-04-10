require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // for parsing application/json

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Use Routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
