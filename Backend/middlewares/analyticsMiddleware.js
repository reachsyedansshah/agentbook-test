const Analytics = require('../models/analyticsModel'); // Import your analytics model

const analyticsLogger = async (req, res, next) => {
  const timestamp = new Date();
  const method = req.method;
  const path = req.originalUrl;
  const user = req.user.userId;  

  const analyticsData = new Analytics({
    timestamp,
    method,
    path,
    user
  });

  try {
    await analyticsData.save(); // Save the data to your database
  } catch (error) {
    console.error('Analytics logging error:', error);
  }

  next();
};

module.exports = analyticsLogger;
