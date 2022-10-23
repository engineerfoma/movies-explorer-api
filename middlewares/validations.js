const { Joi, celebrate } = require('celebrate');
const { validURL } = require('../utils/consts');

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    avatar: Joi.string().regex(validURL),
  }),
});

module.exports = {
  validateAuthentication,
  validateUserBody,
};
