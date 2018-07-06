const express = require('express');

const app = express();

app.get('/', (req, res) => {
     console.log( 'hit' );
     res.sendStatus(200);
});
app.get('/cities', (req, res) => {
     console.log( 'hit /cities' );
     res.json([
          { id:1, name: 'london' },
          { id:2, name: 'leeds' }
     ]);
});

module.exports = app;
