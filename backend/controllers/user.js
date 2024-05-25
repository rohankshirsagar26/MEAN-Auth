const Role = require('../models/Role');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res, next) => {
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

module.exports = { registerUser }