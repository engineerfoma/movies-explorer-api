const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { BadRequestError } = require('../errors/bad-request-err');
const { NotFoundError } = require('../errors/not-found-err');
const { AuthorizationError } = require('../errors/authorization-err');
const { ConflictError } = require('../errors/conflict-err');
const { JWT_LOCAL } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  try {
    const hashePassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashePassword,
      name,
    });
    return res.send(user.toObject());
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequestError('Ошибка в запросе'));
    }

    if (e.code === 11000) {
      return next(new ConflictError('Такой email уже существует'));
    }
    return next(e);
  }
};

const login = async (req, res, next) => {
  console.dir(req.cookies);
  const {
    email,
    password,
  } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AuthorizationError('Неправильные почта или пароль'));
    }

    const isUserValid = await bcrypt.compare(password, user.password);
    if (!isUserValid) {
      return next(new AuthorizationError('Неправильные почта или пароль'));
    }

    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_LOCAL);
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      SameSite: 'None',
      secure: true,
    });
    return res.send({ email });
  } catch (e) {
    return next(e);
  }
};

const getUserInfo = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    return res.send(user);
  } catch (e) {
    return next(e);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (e) {
    return next(e);
  }
};

const updateUserProfile = async (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.send(user);
  } catch (e) {
    if (e.code === 11000) {
      return next(new ConflictError('почтовый ящик уже используется'));
    }
    if (e.name === 'ValidationError') {
      return next(new BadRequestError('Ошибка в запросе'));
    }
    return next(e);
  }
};

const signOut = async (req, res, next) => {
  try {
    return await res.clearCookie('jwt').send({ message: 'cookies are cleaned' });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUserProfile,
  login,
  getUserInfo,
  signOut,
};
