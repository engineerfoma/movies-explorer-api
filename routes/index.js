const express = require('express');
const cors = require('cors');

const routes = express.Router();

const { userRoutes } = require('./users');
const { movieRoutes } = require('./movies');
const { auth } = require('../middlewares/auth');

const {
  validateAuthentication,
  validateUserBody,
} = require('../middlewares/validations');

const {
  createUser,
  login,
  signOut,
} = require('../controllers/users');

const { NotFoundError } = require('../errors/not-found-err');

routes.use(cors({
  origin: [
    'https://movies.front.fmn.nomoredomains.club/',
    'http://movies.front.fmn.nomoredomains.club/',
    'http://localhost:3000',
    'http://localhost',
  ],
  credentials: true,
}));

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server Error');
  }, 0);
});

routes.post('/signup', validateUserBody, createUser);
routes.post('/signin', validateAuthentication, login);
routes.use(auth);
routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);
routes.get('/signout', signOut);

routes.use((req, res, next) => {
  try {
    return next(new NotFoundError('Страница не найдена'));
  } catch (e) {
    return next();
  }
});

module.exports = {
  routes,
};
