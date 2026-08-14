const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Mount Routes
app.use('/api/tasks', taskRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'CastError') {
    return res.status(404).json({ success: false, error: 'Resource not found' });
  }
  res.status(500).json({ success: false, error: err.message || 'Server Error' });
});

// Connect to Database & Start Server
const PORT = process.env.PORT || 6000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
  });