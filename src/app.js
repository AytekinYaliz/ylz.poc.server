const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');
const config = require('./config');
const { DeploymentType } = require('./libs/constants');
const { ResponseError } = require('./libs/ResponseError');


const nodeEnv = process.env.NODE_ENV;

/**
 * Initialize App
 */
const app = express();

/**
 * DB Setup
 */
mongoose.connect(config.mongodbConnection);

/**
 * Middlewares
 */
app.use(bodyParser.json());
app.use(cors({
   origin: JSON.parse(config.corsOrigin),
   // credentials: true,
   optionsSuccessStatus: 200
}));
if (nodeEnv === DeploymentType.local || nodeEnv === DeploymentType.test) {
   app.use(morgan('dev'));
} else {
   app.use(morgan('combined'));
}

/**
 * Controllers
 */
router(app);

/**
 * ErrorHandler
 */
app.use((err, req, res, next) => {
   console.error(err);
   return res.status(500).json(new ResponseError(err.message));
});

module.exports = app;
