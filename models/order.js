const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    requests: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    heightFt: {
        type: Number,
        required: true
    },
    heightIn: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    eyes: {
        type: String,
        required: true
    },
    hair: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order