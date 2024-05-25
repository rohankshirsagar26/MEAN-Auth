const express = require('express');
const { register, login, registerAdmin } = require('../controllers/user');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/register-admin', registerAdmin);

module.exports = userRouter;