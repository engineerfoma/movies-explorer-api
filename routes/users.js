const express = require('express');

const userRoutes = express.Router();

const { validateUpdateUserBody } = require('../middlewares/validations');
const { getUserInfo, updateUserProfile } = require('../controllers/users');

userRoutes.get('/users/me', getUserInfo);
userRoutes.patch('/users/me', validateUpdateUserBody, updateUserProfile);

module.exports = {
  userRoutes,
};
