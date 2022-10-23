const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator: (url) => isURL(url),
      message: 'Некорректный адрес',
    },
  },
  trailerLink: {
    type: String,
    require: true,
    validate: {
      validator: (url) => isURL(url),
      message: 'Некорректный адрес',
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator: (url) => isURL(url),
      message: 'Некорректный адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    requier: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    requier: true,
  },
});

module.exports = mongoose.model('card', userSchema);
