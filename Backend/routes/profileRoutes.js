const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateRequest = require('../middlewares/validateRequest');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require("../utils/fileUploader")
const { updateUserValidationSchema } = require('../validators/userValidator');

//Update Profile
router.put('/profile', authMiddleware, upload.single('avatar'), validateRequest(updateUserValidationSchema),  userController.updateUserProfile);
// Upload avatar
router.post('/avatar', authMiddleware, upload.single('avatar'), userController.uploadAvatar);



module.exports = router;
