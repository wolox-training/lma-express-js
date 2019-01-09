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

exports.index = async (req, res) => {
  try {
    const requestedPage = req.query.page || 1;
    const requestedRecordsPerPage = req.query.recordsPerPage || 20;
    const offset = (requestedPage - 1) * requestedRecordsPerPage;
    const limit = requestedRecordsPerPage;
    const result = await User.findAndCountAll({
      attributes: ['firstName', 'lastName', 'email'],
      offset,
      limit
    });
    const pages = Math.ceil(result.count / limit);
    res.status(200).send({ users: result.rows, count: result.count, pages });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};
