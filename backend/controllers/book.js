const Book = require("../models/Book");
const createError = require("../utils/error");
const createSuccess = require("../utils/success");

const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find({});
        return next(createSuccess(true, 200, 'Fetched all books successfully', books));
    } catch (error) {
        return next(createError(500, error.message));
    }
}

module.exports = { getAllBooks }