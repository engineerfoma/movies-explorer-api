const express = require('express');
const cors = require('cors');

const routes = express.Router();

const { auth } = require('../middlewares/auth');
const { validateAuthentication, validateUserBody } = require('../middlewares/validations');
const {
  createUser,
  login,
  getUserInfo,
  updateUserProfile,
  signOut,
} = require('../controllers/users');

const { getMovies, setMovies } = require('../controllers/movies');
const { NotFoundError } = require('../errors/not-found-err');

routes.use(cors({
  origin: [
    'https://movies.fmn.nomoredomains.icu',
    'http://movies.fmn.nomoredomains.icu',
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

routes.get('/users/me', getUserInfo);
routes.patch('/users/me', updateUserProfile);
routes.get('/movies', getMovies);
routes.post('/movies', setMovies);
routes.delete('/movies/_id', removeMovie);
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
