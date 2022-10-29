const { authError } = require('../utils/consts');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = authError;
  }
}

module.exports = {
  AuthorizationError,
};
