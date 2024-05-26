const User = require("../models/User");
const createError = require("../utils/error");
const createSuccess = require("../utils/success");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});

        if (users) {
            return next(createSuccess(true, 200, `All users fetched successfully`, users));
        } else {
            return next(createError(404, 'Users not found'));
        }
    } catch (err) {
        return next(createError(500, err.message));
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.find({ _id: req.params.id });
        if (user.length > 0) {
            return next(createSuccess(true, 200, `User ${user[0].firstName} fetched successfully`, user));
        } else {
            return next(createError(404, 'User not found'));
        }
    } catch (err) {
        return next(createError(500, err.message));
    }
}

module.exports = { getAllUsers, getUser }