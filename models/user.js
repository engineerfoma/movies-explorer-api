const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Александр',
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Невалидный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    toObject: {
      useProjection: true,
    },
  },
);

module.exports = mongoose.model('user', userSchema);
