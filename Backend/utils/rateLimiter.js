const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limiting one IP to 100 req per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

module.exports = limiter;
