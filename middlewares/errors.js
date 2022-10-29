const { serverErr } = require('../utils/consts');

exports.module = (err, req, res, next) => {
  const { statusCode = serverErr, message } = err;
  res.status(statusCode).send({
    message: statusCode === serverErr ? 'На сервере произошла ошибка' : message,
  });
  next();
};
