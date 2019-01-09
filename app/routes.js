const usersController = require('./controllers/usersController');
const sessionsController = require('./controllers/sessionsController');
const auth = require('./middlewares/auth');

exports.init = app => {
  app.get('/users', auth.verifyToken, usersController.index);
  app.post('/users', [], usersController.create);
  app.post('/users/sessions', [], sessionsController.create);
};
