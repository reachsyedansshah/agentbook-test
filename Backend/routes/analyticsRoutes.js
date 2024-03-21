const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/statistics', authMiddleware, analyticsController.userStats);

module.exports = router;
