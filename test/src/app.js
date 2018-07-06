const express = require('express');

const app = express();
const cities = require('./controllers/cities');


app.use('/api/cities', cities);

module.exports = app;
