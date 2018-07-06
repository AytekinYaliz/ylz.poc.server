const assert = require('assert');
// const request = require('mocha');
const chai = require('chai');
const app = require('./src/app');

describe('GET /cities', () => {
  it('Test w/ node.assert', (done) => {
       assert.equal(1, 1);
       done();

    // request(app)
    //   .get('/user')
    //   .set('Accept', 'application/json')
    //   .expect('Content-Type', /json/)
    //   .expect(200, done);
  });

  it('Test w/ chai', (done) => {
       chai.assert.equal(2, 2);
       done();

    // request(app)
    //   .get('/user')
    //   .set('Accept', 'application/json')
    //   .expect('Content-Type', /json/)
    //   .expect(200, done);
  });
});
