'use strict';

const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../../app'),
  User = require('../../app/models').users,
  {
    createUserRequest,
    validUser,
    userWithShortPassword,
    userWithNonAlphanumericPassword,
    missingParamsUser,
    userWithInvalidEmailDomain
  } = require('./../utils/users'),
  config = require('../../config'),
  chaiHttp = require('chai-http'),
  logger = require('../../app/logger'),
  expect = chai.expect;

chai.use(chaiHttp);

describe('users', () => {
  describe('/users/ POST', () => {
    it('should create a new user successfully', done => {
      createUserRequest(validUser).then(res => {
        expect(res).have.status(201);
        dictum.chai(res, 'create a new user');
        done();
      });
    });
    it('should store the password encrypted', done => {
      createUserRequest(validUser).then(res => {
        expect(res.password).to.not.equal(validUser.password);
        done();
      });
    });
    it('should not create an user with a short password', done => {
      createUserRequest(userWithShortPassword).then(res => {
        expect(res.body.errors[0].message).to.match(/Validation len on password failed/);
        expect(res).have.status(400);
        done();
      });
    });
    it('should not create an user with a non alphanumerical password', done => {
      createUserRequest(userWithNonAlphanumericPassword).then(res => {
        expect(res.body.errors[0].message).to.match(/Validation isAlphanumeric on password failed/);
        expect(res).have.status(400);
        done();
      });
    });
    it('should not create an user with an email from a domain different than wolox', done => {
      createUserRequest(userWithInvalidEmailDomain).then(res => {
        expect(res.body.errors[0].message).to.match(/only wolox domains are allowed/i);
        expect(res).have.status(400);
        done();
      });
    });
    it('should not create an user with an email that already exists', async () => {
      await createUserRequest(validUser);
      const res = await createUserRequest(validUser);
      expect(res.body.errors[0].message).to.match(/email must be unique/i);
      expect(res).have.status(400);
    });
    it('should not create an user when there are missing params', done => {
      createUserRequest(missingParamsUser).then(res => {
        expect(res.body.errors[0].message).to.match(/cannot be null/i);
        expect(res).have.status(400);
        done();
      });
    });
  });
});
