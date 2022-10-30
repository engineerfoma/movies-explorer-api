const express = require('express');

const userRoutes = express.Router();

const { validateUpdateUserBody } = require('../middlewares/validations');
const { getUserInfo, updateUserProfile } = require('../controllers/users');

userRoutes.get('/me', getUserInfo);
userRoutes.patch('/me', validateUpdateUserBody, updateUserProfile);

module.exports = {
  userRoutes,
};
