const config = {
  APP_HOST: process.env.APP_HOST || "http://localhost:4001",
  env: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 3001
};

module.exports = config;
