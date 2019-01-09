'use strict';

const jwt = require('jsonwebtoken'),
  error = require('../errors'),
  logger = require('../logger'),
  { decoder, AUTHORIZATION_HEADER } = require('../services/session'),
  User = require('../models').users;

const currentUser = auth => {
  const user = decoder(auth);
  return User.findOne({ where: { email: user.email } });
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers[AUTHORIZATION_HEADER];
    if (token) {
      const user = await currentUser(token);
      req.currentUser = user;
      next();
    } else {
      next(error.authorizationError('Token is required!'));
    }
  } catch (err) {
    logger.error(err);
    next(error.authorizationError('Token is invalid!'));
  }
};
