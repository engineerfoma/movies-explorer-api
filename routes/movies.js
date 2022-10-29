const express = require('express');

const movieRoutes = express.Router();

const { validateMovieBody, validateIdMovie } = require('../middlewares/validations');
const { getMovies, setMovie, deleteMovieById } = require('../controllers/movies');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', validateMovieBody, setMovie);
movieRoutes.delete('/:id', validateIdMovie, deleteMovieById);

module.exports = {
  movieRoutes,
};
