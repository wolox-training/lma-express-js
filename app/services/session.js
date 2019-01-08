'use strict';

const jwt = require('jsonwebtoken'),
  config = require('../../config'),
  secret = config.common.session.secret;

exports.encoder = payload => jwt.sign({ email: payload.email }, secret);
exports.AUTHORIZATION_HEADER = config.common.session.header_name;
exports.decoder = token => jwt.verify(token, secret);
