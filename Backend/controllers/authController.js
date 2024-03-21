const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Analytics = require('../models/analyticsModel');

/**
 * Registers user API
 * POST
 * 
 * @param {Object} req - The request object containing user registration data.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object. {
    "message": "User registered successfully"
}
 * @returns Sends a response with status code 201 and a success message if registration is successful.
 *          Sends a response with status code 400 if the user already exists.
 *          Sends a response with status code 500 and an error message if there's a server error.
 */
exports.register = async (req, res) => {
    try {
        //Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).send({ error: 'Email already registered' });
        //New User
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const user = new User({ name: req.body.name, email: req.body.email, password: hashedPassword });
        await user.save();
        // Log analytics data for registration
        const analyticsData = new Analytics({
            timestamp: new Date(),
            method: 'POST',
            path: '/api/auth/register',
            user: user._id // Logging the newly registered user's ID
        });
        await analyticsData.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * User Login API
 * * POST
 * 
 * @param {Object} req - The request object containing user login data.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object. {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZjMTRjZTQ1ZTYiLCJpYXQiOjE3MTEwMTkyMjgsImVjgyOH0.ingAF1b4NXZwSWVSNLxlRU5Rm326hLCzRA3oQ8Tq2AI"
}
 * @returns Sends a response with status code 200 and a JWT token if login is successful.
 *          Sends a response with status code 401 if the credentials are invalid.
 *          Sends a response with status code 500 and an error message if there's a server error.
 */
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        console.log(await bcrypt.compare(req.body.password, user.password))
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const analyticsData = new Analytics({
            timestamp: new Date(),
            method: 'POST',
            path: '/api/auth/login',
            user: user._id
        });
        await analyticsData.save();
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
