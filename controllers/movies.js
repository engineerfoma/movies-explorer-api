const Movie = require('../models/movie');
const { BadRequestError } = require('../errors/bad-request-err');
const { NotFoundError } = require('../errors/not-found-err');
const { ForbiddenError } = require('../errors/forbidden-err');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    return res.send(movies);
  } catch (e) {
    return next(e);
  }
};

const setMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ owner: req.user._id, ...req.body });
    return res.send(movie);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequestError('Ошибка в запросе'));
    }
    return next(e);
  }
};

const deleteMovieById = async (req, res, next) => {
  const { movieId } = req.params;
  const currentUserId = req.user._id;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return next(new NotFoundError('карточка не найдена'));
    }
    const movieOwner = movie.owner._id.toString();
    if (movieOwner !== currentUserId) {
      return next(new ForbiddenError('Не хватает прав на удаление чужой карточки!'));
    }
    await Movie.findByIdAndDelete(movieId);

    return res.send(movie);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequestError('Ошибка в запросе'));
    }
    return next(e);
  }
};

module.exports = {
  setMovie, getMovies, deleteMovieById,
};
