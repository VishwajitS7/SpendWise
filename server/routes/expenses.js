const router = require('express').Router();
const auth = require('../middleware/auth');
let Expense = require('../models/expense.model');

// @route   GET /expenses/
// @desc    Get all expenses for a user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   POST /expenses/add
// @desc    Add a new expense
// @access  Private
router.post('/add', auth, async (req, res) => {
    try {
        const { description, amount, category, date } = req.body;
        if (!description || !amount || !category || !date) {
            return res.status(400).json({ msg: "Please enter all fields." });
        }
        const newExpense = new Expense({
            description,
            amount,
            category,
            date,
            userId: req.user
        });
        const savedExpense = await newExpense.save();
        res.json(savedExpense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   DELETE /expenses/:id
// @desc    Delete an expense
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findOne({ _id: req.params.id, userId: req.user });
        if (!expense) {
            return res.status(404).json({ msg: "No expense found for this user." });
        }
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ msg: "Expense deleted." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   PUT /expenses/update/:id
// @desc    Update an expense
// @access  Private
router.put('/update/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }
        if (expense.userId.toString() !== req.user) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        const { description, amount, category, date } = req.body;
        expense.description = description;
        expense.amount = amount;
        expense.category = category;
        expense.date = date;
        await expense.save();
        res.json({ msg: 'Expense updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /expenses/summary
// @desc    Get expense summary by category for a user
// @access  Private
router.get('/summary', auth, async (req, res) => {
    try {
        const summary = await Expense.aggregate([
            // Match expenses for the logged-in user
            { $match: { userId: req.user } },
            // Group by category and sum the amounts
            {
                $group: {
                    _id: '$category',
                    totalAmount: { $sum: '$amount' }
                }
            },
            // Rename _id to category for easier use in frontend
            {
                $project: {
                    name: '$_id',
                    value: '$totalAmount',
                    _id: 0
                }
            }
        ]);
        res.json(summary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
