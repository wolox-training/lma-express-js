const usersController = require('./controllers/usersController');
const sessionsController = require('./controllers/sessionsController');

exports.init = app => {
  app.post('/users', [], usersController.create);
  app.post('/users/sessions', [], sessionsController.create);
};
