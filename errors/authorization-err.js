const { AuthError } = require('../utils/consts');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AuthError;
  }
}

module.exports = {
  AuthorizationError,
};
