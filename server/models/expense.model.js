// server/models/expense.model.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
     userId: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;