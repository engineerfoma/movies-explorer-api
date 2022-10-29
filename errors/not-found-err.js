const { notFoundErr } = require('../utils/consts');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notFoundErr;
  }
}

module.exports = {
  NotFoundError,
};
