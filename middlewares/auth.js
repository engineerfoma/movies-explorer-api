const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors/authorization-err');
const { JWT_LOCAL } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_LOCAL);
  } catch (e) {
    return next(new AuthorizationError('Ошибка авторизации'));
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
