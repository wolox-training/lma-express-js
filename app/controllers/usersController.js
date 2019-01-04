const User = require('../models').users;
const logger = require('../logger');

exports.create = async (req, res) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    logger.info(`User successfully created: ${user}`);
    res.status(201).send(user);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};
