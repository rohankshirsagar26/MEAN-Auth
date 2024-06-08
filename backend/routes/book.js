const express = require('express');
const { getAllBooks } = require('../controllers/book');
const { verifyUser } = require('../utils/verifyToken');

const booksRouter = express.Router();

booksRouter.get('/', verifyUser, getAllBooks);

module.exports = booksRouter;