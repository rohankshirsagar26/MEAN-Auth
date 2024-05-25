const Role = require('../models/Role');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createSuccess = require('../utils/success');
const createError = require('../utils/error');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password } = req.body

        const role = await Role.find({ role: 'User' });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User({ firstName, lastName, username, email, password: hashPassword, roles: role });

        await newUser.save()
        return next(createSuccess(true, 201, `${newUser.firstName} registered successfully`, newUser));
    } catch (err) {
        return next(createError(500, err.messaage));
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }).populate("roles", "role");
        if (!user) {
            return next(createError(404, 'User not found'));
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(404, 'Password is incorrect'));
        }

        const token = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin, roles: user.roles },
            process.env.JWT_SECRET
        )

        res.cookie("access_token", token, { httpOnly: true, maxAge: 9000000 }).status(200).send({ status: 200, message: "Login success", data: user })
    } catch (err) {
        return next(createError(500, err.messaage));
    }
}

module.exports = { register, login }