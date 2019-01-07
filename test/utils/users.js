'use strict';

const chai = require('chai'),
  server = require('../../app');

exports.validUser = {
  firstName: 'john',
  lastName: 'doe',
  email: 'johndoe@wolox.com.ar',
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
