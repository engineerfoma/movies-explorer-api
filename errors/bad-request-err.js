const { badReqError } = require('../utils/consts');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = badReqError;
  }
}

module.exports = {
  BadRequestError,
};
