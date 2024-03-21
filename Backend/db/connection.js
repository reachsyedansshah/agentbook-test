require('dotenv').config();
const mongoose = require("mongoose");
const config = require("../config/index")

const connectMongoDB = () => {
    try {
        console.log("process.env.MONGODB_URI",config.MONGO_URI)
        mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 5000
        });

        mongoose.connection.on('connected', function () {
            console.log(`Successfully connected to ${config.MONGO_URI}`);
        });

        mongoose.connection.on('error', function (err) {
            console.error('Mongoose connection error: ' + err);
        });

        mongoose.connection.on('disconnected', function () {
            console.log('DB Disconnected');
        });
    } catch (error) {
        console.log("mongoose error", error.message)
    }
};

module.exports = connectMongoDB;
