const express = require('express');

const userRoutes = express.Router();

const {
  validateMovieBody,
  validateIdMovie,
} = require('../middlewares/validations');
const { getMovies, setMovie, deleteMovieById } = require('../controllers/movies');

userRoutes.get('/movies', getMovies);
userRoutes.post('/movies', validateMovieBody, setMovie);
userRoutes.delete('/movies/_id', validateIdMovie, deleteMovieById);

module.exports = {
  userRoutes,
};
