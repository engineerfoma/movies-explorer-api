const Movie = require('../models/movie');
const { BadRequestError } = require('../errors/bad-request-err');
const { NotFoundError } = require('../errors/not-found-err');
const { ForbiddenError } = require('../errors/forbidden-err');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    return res.status(200).send(movies);
  } catch (e) {
    return next(e);
  }
};

const setMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ owner: req.user._id, ...req.body });
    return res.status(200).send(movie);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequestError('Ошибка в запросе'));
    }
    return next(e);
  }
};

const deleteMovieById = async (req, res, next) => {
  const { cardId } = req.params;
  const currentUserId = req.user._id;
  try {
    const card = await Movie.findById(cardId);
    if (!card) {
      return next(new NotFoundError('карточка не найдена'));
    }
    const cardOwner = card.owner._id.toString();
    if (cardOwner !== currentUserId) {
      return next(new ForbiddenError('Не хватает прав на удаление чужой карточки!'));
    }
    await Movie.findByIdAndDelete(cardId);

    return res.status(200).send(card);
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
