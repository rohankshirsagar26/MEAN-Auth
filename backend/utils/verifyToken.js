const jwt = require('jsonwebtoken');
const createError = require('./error');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(404, 'You are not authenticated'))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createError(403, 'Invalid token'));
        } else {
            req.user = user;
            next();
        }
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, 'You are not authenticaated'));
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, 'You are not authenticaated'));
        }
    })
}

module.exports = { verifyToken, verifyUser, verifyAdmin }