const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    salt:{
        type: String,
        required: true
    },
    marked: {
        type: Boolean,
        required: true
    },
    reffered: {
        type: [String],
        required: true
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User