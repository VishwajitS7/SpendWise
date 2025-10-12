const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

// @route   POST /users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // --- NEW VALIDATION LOGIC ---
        if (!username || !password) {
            return res.status(400).json({ msg: 'Please enter all fields.' });
        }

        if (username.length < 5) {
            return res.status(400).json({ msg: 'Username must be at least 5 characters long.' });
        }

        if (password.length < 5) {
            return res.status(400).json({ msg: 'Password must be at least 5 characters long.' });
        }

        // Regex to check for at least one symbol
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!symbolRegex.test(password)) {
            return res.status(400).json({ msg: 'Password must contain at least one symbol.' });
        }
        // --- END OF NEW VALIDATION ---


        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ msg: 'An account with this username already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   POST /users/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ msg: 'Please enter all fields.' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
            },
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   POST /users/tokenIsValid
// @desc    Check if token is valid
// @access  Private
router.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.json(false);
    }
});


module.exports = router;

