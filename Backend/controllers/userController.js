const User = require('../models/userModel');
const logger = require('../utils/logger');
const Analytics = require('../models/analyticsModel');

/**
 * Update User Profile API
 ** PUT
 * Allows authenticated users to update their profile information.
 * user's ID is stored in req.user.userId.
 * 
 * @param {Object} req - The Express request object.
 * @param {string} [req.body.name] - (Optional) New name of the user.
 * @param {string} [req.body.email] - (Optional) New email of the user.
 * @param {Object} res - The Express response object.
 * @returns {Object} JSON response with updated user data or error message.
 */
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;  
        
        const { name, email } = req.body;
        let updateData = { name, email };

        // Handle avatar upload if present
        if (req.file) {
            const avatarUrl = `/uploads/${req.file.filename}`;
            updateData.avatar = avatarUrl;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });

        if (!updatedUser) {
            logger.error(`Error - User not found - ${new Date()}`);
            return res.status(404).json({ error: 'User not found.' });
        }

        // Exclude sensitive information in the response
        const { password, ...updatedUserData } = updatedUser.toObject();
        const analyticsData = new Analytics({
            timestamp: new Date(),
            method: 'PUT',
            path: '/api/user/profile',
            user: userId
        });
        await analyticsData.save();
        logger.info(`User Profile Updated - ${userId} - ${new Date()}`);

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUserData });
    } catch (error) {
        if (error.code === 11000) {
            logger.error(`Error - Email already exists - ${new Date()}`);
            return res.status(409).json({ error: "Email already exists." });
        }
        logger.error(`Error - ${error.message} - ${new Date()}`);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Upload User Avatar API
 * POST
 * Allows authenticated users to upload an avatar image.
 * user's ID is stored in req.user.userId.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} req.file - The uploaded file object provided by Multer.
 * @param {Object} res - The Express response object.
 * @returns {Object} JSON response confirming the upload with the avatar URL or error message.
 */
exports.uploadAvatar = async (req, res) => {
    try {
        if (req.file) {
            const userId = req.user.userId;
            const user = await User.findById(userId);
        
            if (!user) {
                logger.error(`Error - User not found - ${new Date()}`);
                return res.status(404).json({ error: 'User not found' });
            }

            // // Construct the URL/path for the avatar
            // user.avatar = req.file.path; // Update the avatar path
            // await user.save();

            const avatarUrl = `/uploads/${req.file.filename}`; // Adjust this based on your folder structure

            // Update the user's avatar in the database
            await User.findByIdAndUpdate(userId, { avatar: avatarUrl });
            logger.info(`User Avatar Added - ${userId} - ${new Date()}`);
            const analyticsData = new Analytics({
                timestamp: new Date(),
                method: 'POST',
                path: '/api/user/avatar',
                user: userId
            });
            await analyticsData.save();
            res.status(200).json({ message: 'Avatar uploaded successfully', avatarUrl });
        } else {
            logger.error(`Error - No valid image provided - ${new Date()}`);
            res.status(400).json({ error: 'No valid image provided' });
        }
    } catch (error) {
        logger.error(`Error - ${error.message} - ${new Date()}`);
        res.status(500).json({ error: error.message });
    }
};

