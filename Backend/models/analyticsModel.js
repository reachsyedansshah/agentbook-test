const mongoose = require('mongoose');
const { Schema } = mongoose;

const analyticsSchema = new Schema({
  timestamp: Date,
  method: String,
  path: String,
  user: {
    type: Schema.Types.ObjectId, // Reference to User schema
    ref: 'User' // Assuming your user model is named 'User'
  },
  // Add other fields as necessary
});

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;
