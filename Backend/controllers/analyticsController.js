const User = require('../models/userModel');
const logger = require('../utils/logger')
const Analytics = require("../models/analyticsModel")
/**
 * User Stats API
 * * GET
 * Allows authenticated users to update their profile information.
 * user's ID is stored in req.user.userId.
 *
 * @param {Object} req - The Express request object.
 * @param {string} [req.body.name] - (Optional) New name of the user.
 * @param {string} [req.body.email] - (Optional) New email of the user.
 * @param {Object} res - The Express response object.
 * @returns {Object} JSON response with updated user data or error message.
 */
exports.userStats = async (req, res) => {
    try {  
        const userId = req.user.userId;
       
        const stats = await Analytics.find({ user: userId })
        .sort({ _id: -1 }) 
        .limit(100); 
        
        logger.info(`User Stats Fetched - ${userId} - ${new Date()}`);

        res.json(stats);

    } catch (error) {
        logger.error(`Error - ${error.message} - ${new Date()}`);
        res.status(500).json({ message: error.message });
    };
}
