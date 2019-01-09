const UNAUTHORIZED_CODE = 401;

const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);
exports.authorizationError = message => internalError(message, UNAUTHORIZED_CODE);
