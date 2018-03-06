const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express();
app.get('/', function(req, res, next) {
   res.json({ name: 'aytek' });
});

app.listen(3000, function() {
   console.log('Listening on port 3000...');

});

