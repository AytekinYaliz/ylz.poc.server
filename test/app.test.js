// stick w/ a single assertion library
const request = require("supertest");
const chai = require("chai");
const chaiHttp = require('chai-http');

const app = require("./src/app");

const { expect } = chai;
chai.use(chaiHttp);

before(() => {
   console.log("Once for the file");
});
beforeEach(() => {
   console.log("For each it");
});

describe("GET /cities", () => {
   it("Test w/ chai.expect", () => {
      expect(2).to.not.equal(1);
   });

   it("Test w/ chai.request", done => {
      chai
         .request(app)
         .get("/api/cities/2")
         .send({ name: 'test' })    // npm i -S body-parser
         .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an("array");
            expect(res.body).to.have.length(5);
            done();
         });
   });

   it("Test w/ supertest", done => {
      request(app)
         .get("/api/cities")
         .set("Accept", "application/json")
         .send({ name: 'test' })    // npm i -S body-parser
         .expect("Content-Type", /json/)
         .expect(200)
         .end((err, res) => {
            if (err) return done(err);
            done();
         });
   });
});
