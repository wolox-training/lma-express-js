const usersController = require('./controllers/usersController');

exports.init = app => {
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  app.post('/users', [], usersController.create);
};
