const { conflictErr } = require('../utils/consts');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = conflictErr;
  }
}

module.exports = {
  ConflictError,
};
