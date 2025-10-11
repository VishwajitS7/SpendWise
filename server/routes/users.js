const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
let User = require('../models/user.model');

// @route   POST /users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        let { username, password, passwordCheck } = req.body;

        // Validation
        if (!username || !password || !passwordCheck)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        if (password.length < 5)
            return res.status(400).json({ msg: "The password needs to be at least 5 characters long." });
        if (password !== passwordCheck)
            return res.status(400).json({ msg: "Enter the same password twice for verification." });

        const existingUser = await User.findOne({ username: username });
        if (existingUser)
            return res.status(400).json({ msg: "An account with this username already exists." });

        // Password Hashing
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: passwordHash
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   POST /users/login
// @desc    Login a user
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });

        const user = await User.findOne({ username: username });
        if (!user)
            return res.status(400).json({ msg: "No account with this username has been registered." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials." });

        // Create JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   POST /users/tokenIsValid
// @desc    Check if token is valid
// @access  Public
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

// @route   GET /users/
// @desc    Get user data
// @access  Private
router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        username: user.username,
        id: user._id
    });
});

module.exports = router;
