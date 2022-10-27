const { Joi, celebrate } = require('celebrate');
const { validURL, validRU, validEN } = require('../utils/consts');

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30),
    director: Joi.string().min(2).max(30),
    duration: Joi.number(),
    year: Joi.string().min(4),
    description: Joi.string().min(1).max(80),
    image: Joi.string().regex(validURL),
    trailer: Joi.string().regex(validURL),
    nameRU: Joi.string().regex(validRU),
    nameEN: Joi.string().regex(validEN),
  }),
});

const validateIdMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().alphanum().length(24),
  }),
});

module.exports = {
  validateAuthentication,
  validateUserBody,
  validateUpdateUserBody,
  validateMovieBody,
  validateIdMovie,
};
