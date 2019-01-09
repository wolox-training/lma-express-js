'use strict';

const chai = require('chai'),
  server = require('../../app'),
  AUTHORIZATION_HEADER = require('../../app/services/session').AUTHORIZATION_HEADER;

exports.validUser = {
  firstName: 'john',
  lastName: 'doe',
  email: 'johndoe@wolox.com.ar',
  password: '12345678'
};

exports.userWithWrongPassword = {
  firstName: 'john',
  lastName: 'doe',
  email: 'johndoe@wolox.com.ar',
  password: '1234567890'
};

exports.userWithWrongEmail = {
  firstName: 'john',
  lastName: 'doe',
  email: 'johndoe@wwwolox.com.ar',
  password: '12345678'
};

exports.userWithShortPassword = {
  firstName: 'john',
  lastName: 'doe',
  email: 'johndoe@wolox.com.ar',
  password: '1234567'
};

exports.userWithNonAlphanumericPassword = {
  firstName: 'john',
  lastName: 'doe',
  email: 'johndoe@wolox.com.ar',
  password: '1234567_%&'
};

exports.userWithInvalidEmailDomain = {
  firstName: 'john',
  lastName: 'doe',
  email: 'johndoe@wolox.org.ar',
  password: '12345678'
};

exports.missingParamsUser = {
  firstName: 'john',
  email: 'johndoe@wolox.org.ar',
  password: '12345678'
};

exports.createUserRequest = user =>
  chai
    .request(server)
    .post('/users')
    .send(user);

exports.signInUserRequest = user =>
  chai
    .request(server)
    .post('/users/sessions')
    .send(user);

exports.usersIndexRequest = (auth, query = '') =>
  chai
    .request(server)
    .get(`/users${query}`)
    .set(AUTHORIZATION_HEADER, auth)
    .send();
