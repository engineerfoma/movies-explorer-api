const { forbErr } = require('../utils/consts');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = forbErr;
  }
}

module.exports = {
  ForbiddenError,
};
