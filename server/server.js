// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
// server/server.js

const allowedOrigins = [
  'http://localhost:3000',
  'https://spend-wise-q55u9fzh3-vishwajits-projects-143cafb6.vercel.app/login' // <-- ADD YOUR LIVE URL HERE
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json()); // This allows the server to accept JSON in the body of requests

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// API Routes
const expensesRouter = require('./routes/expenses');
const usersRouter = require('./routes/users'); // <- This is the new line for the user router

app.use('/expenses', expensesRouter);
app.use('/users', usersRouter); // <- This line tells the app to use the new router

// A simple test route
app.get('/', (req, res) => {
    res.send('Hello from the Expense Tracker Backend!');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});