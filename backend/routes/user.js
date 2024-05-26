const express = require('express');
const { getAllUsers, getUser } = require('../controllers/user');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken');

const userRouter = express.Router();

userRouter.get('/', verifyAdmin, getAllUsers);
userRouter.get('/:id', verifyUser, getUser);

module.exports = userRouter;