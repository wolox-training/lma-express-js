'use scrict';

const User = require('../models').users,
  { encoder, AUTHORIZATION_HEADER } = require('../services/session'),
  logger = require('../logger');

exports.create = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user && (await user.validPassword(req.body.password))) {
      logger.info(`User successfully signed in: ${user}`);
      const token = encoder({ email: user.email });
      res
        .set(AUTHORIZATION_HEADER, token)
        .status(200)
        .send({ access_token: token });
    } else {
      res.status(401).send('Wrong email or password');
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};
