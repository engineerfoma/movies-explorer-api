const { serverErr } = require('../utils/consts');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = serverErr;
  }
}

module.exports = {
  ServerError,
};
