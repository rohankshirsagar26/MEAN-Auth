const Role = require('../models/Role');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createSuccess = require('../utils/success');
const createError = require('../utils/error');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const Token = require('../models/UserToken');

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

const registerAdmin = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const role = await Role.find({});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const admin = new User({ firstName, lastName, username, email, password: hashPassword, isAdmin: true, roles: role });

        await admin.save();
        return next(createSuccess(true, 201, 'Admin registration successful'), admin)
    } catch (err) {
        return next(createError(500, err.messaage));
    }
}

const sendEmail = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({ email: { $regex: '^' + email + '$', $options: 'i' } });

    if (!user) {
        return next(createError(404, 'User not found'));
    }

    const payload = { email: user.email };
    const expiryTime = 300;

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime })

    const newToken = new Token({
        userId: user._id,
        token
    })

    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'technologiesmayura@gmail.com',
            pass: 'rcqx jzku auzk lahv'
        }
    })

    const mailDetails = {
        from: 'technologiesmayura@gmail.com',
        to: email,
        subject: 'Reset Password',
        html: `
            <html>
                <head>
                    <title>Password Reset</title>
                </head>
                <body>
                    <h1>Reset Password Request</h1>
                    <p>Dear ${user.firstName}</p>
                    <p>We have received a request to reset your password for your account with BookMyBook. To complete the password reset process, please click on the button below:</p>
                    <a href="${process.env.LIVE_URL}/reset/${token}">
                        <button style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px;">Reset Password</button>
                    </a>
                    <p>Please note that this link is valid only for 5 minutes. If you did not request password reset, please disregard this message.</p>
                    <p>Thank you,</p>
                    <p>Mayura Technologies</p>
                </body>
            </html>
        `
    }

    mailTransporter.sendMail(mailDetails, async (error, data) => {
        if (error) {
            console.log(error);
            return next(createError(500, error.message));
        } else {
            await newToken.save();
            return next(createSuccess(true, 200, 'Password reset mail sent successfully'));
        }
    })
}

const resetPassword = (req, res, next) => {
    const { token, password } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return next(createError(500, err.message));
        } else {
            const response = data;
            const user = await User.findOne({ email: { $regex: '^' + response.email + '$', $options: 'i' } });

            const encryptedPassword = await bcrypt.hash(password, 10);
            user.password = encryptedPassword;

            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $set: user },
                    { new: true }
                )
                return next(createSuccess(true, 201, 'Password reset successfully', updatedUser))
            } catch (error) {
                return next(createError(500, error.message));
            }
        }
    })
}

module.exports = { register, login, registerAdmin, sendEmail, resetPassword }