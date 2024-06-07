const express = require('express');
const { register, login, registerAdmin, sendEmail } = require('../controllers/auth');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/register-admin', registerAdmin);
authRouter.post('/reset-password', sendEmail);

module.exports = authRouter;