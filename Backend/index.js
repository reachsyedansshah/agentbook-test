require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); '';
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

const config = require("./config");
const connectMongoDB = require("./db/connection");
const routes = require("./routes/index");
const logger = require('./utils/logger');
const rateLimiter = require('./utils/rateLimiter');
const analyticsMiddleware = require('./middlewares/analyticsMiddleware')
const app = express();
const _root = process.cwd();
const _nodeModules = '/node_modules/';
const startTime = new Date();
const dir = path.join(__dirname, 'uploads');

//Apply CORS
const corsOptions = {
  origin: config.APP_HOST,
  "methods": "GET,HEAD,PUT,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static(_root + _nodeModules));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(analyticsMiddleware);
// app.use(contentLength.validateMax({ max: 999 }));
app.use(helmet());
logger.info('Starting the server');

//API rate limitter
app.use(rateLimiter);

//Connection to mongodb
connectMongoDB();
app.use(express.json());
app.use('/api/', routes);
app.use((req, res, next) => {
  if (!req.route) {
    const uptime = `${new Date() - startTime}ms`;
    logger.error(`Endpoint not found - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    return res.status(404).json({
      "Error": `Endpoint not found: ${req.method} ${req.originalUrl}`,
      startTime, uptime
    });
  }
  next();
});


if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

process.on("uncaughtException", (error) => {

  console.error("uncaughtException", error);
  logger.error(`Exception - uncaughtException - ${error.message} - ${new Date()}`);

});

app.listen(config.PORT, () => logger.info(`Auth-backend is running on port ${config.PORT}`));