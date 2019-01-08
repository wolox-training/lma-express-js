'use strict';

const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../../app'),
  User = require('../../app/models').users,
  { signInUserRequest, validUser, userWithWrongPassword, userWithWrongEmail } = require('./../utils/users'),
  config = require('../../config'),
  chaiHttp = require('chai-http'),
  logger = require('../../app/logger'),
  expect = chai.expect;

chai.use(chaiHttp);

describe('sessions', () => {
  describe('/users/sessions POST', () => {
    it('should create a new session successfully', done => {
      User.create(validUser).then(() => {
        signInUserRequest(validUser).then(res => {
          expect(res).have.status(200);
          dictum.chai(res, 'user sign in');
          done();
        });
      });
    });
    it('should return a token in the Authentication header', done => {
      User.create(validUser).then(() => {
        signInUserRequest(validUser).then(res => {
          expect(res.headers.authentication).to.not.equal(null);
          done();
        });
      });
    });
    it('should not create a new session with a wrong password', done => {
      User.create(validUser).then(() => {
        signInUserRequest(userWithWrongPassword).then(res => {
          expect(res).have.status(401);
          done();
        });
      });
    });
    it('should not create a new session with a wrong email', done => {
      User.create(validUser).then(() => {
        signInUserRequest(userWithWrongEmail).then(res => {
          expect(res).have.status(401);
          done();
        });
      });
    });
  });
});
