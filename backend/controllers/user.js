const Role = require('../models/Role');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password } = req.body

        const role = await Role.find({ role: 'User' });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User({ firstName, lastName, username, email, password: hashPassword, roles: role });

        await newUser.save()
        return res.status(200).send('User registered successfully');
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(404).send('Password is incorrect');
        }

        return res.status(200).send('Logged in successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { register, login }