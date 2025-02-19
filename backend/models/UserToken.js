const mongoose = require('mongoose');

const UserTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 300
    }
})

const Token = mongoose.model('Token', UserTokenSchema);

module.exports = Token;