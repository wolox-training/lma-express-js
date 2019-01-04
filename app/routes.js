const usersController = require('./controllers/usersController');

exports.init = app => {
  app.post('/users', [], usersController.create);
};
