const request = require('supertest');
const app = require('./src/app');

request(app)
  .get('/cities')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
       //console.log( 'end' );
    if (err) throw err;
  });
