const express = require('express');
const { register, login, registerAdmin } = require('../controllers/auth');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/register-admin', registerAdmin);

module.exports = authRouter;