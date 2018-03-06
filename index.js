// const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');


/**
 * App Setup
 */
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
routes(app);


/** 
 * Server Setup
 * */
const port = process.env.port || 3001;
app.listen(port, function() {
   console.log(`Server listening on port ${port}...`);
});
