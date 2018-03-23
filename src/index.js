const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router');


/**
 * DB Setup
 */
// mongoose.connect('mongodb://user:user@ds259268.mlab.com:59268/lh-accountancy');
mongoose.connect('mongodb://localhost:27017/lh-accountancy');


/**
 * App Setup
 */
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
router(app);


/**
 * Server Setup
 * */
const port = process.env.port || 3001;
app.listen(port, function() {
   console.log(`Server listening on port ${port}...`);
});
