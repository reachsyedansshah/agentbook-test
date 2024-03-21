const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');
const analyticsRoutes = require('./analyticsRoutes')

router.use('/auth', authRoutes);
router.use('/user', profileRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
