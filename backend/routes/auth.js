const express = require('express');
const { register, login, registerAdmin, sendEmail, resetPassword } = require('../controllers/auth');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/register-admin', registerAdmin);
authRouter.post('/send-email', sendEmail);
authRouter.post('/reset-password', resetPassword);

module.exports = authRouter;