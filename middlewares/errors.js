const { serverErr } = require('../utils/consts');

module.exports = (err, req, res, next) => {
  const { statusCode = serverErr, message } = err;
  res.status(statusCode).send({
    message: statusCode === serverErr ? 'На сервере произошла ошибка' : message,
  });
  next();
};
