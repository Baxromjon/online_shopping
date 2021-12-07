const mongoose = require('mongoose')
const Joi = require('joi')
const { addressSchema } = require('../models/address')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        min: 3,
        max: 55
    },
    lastName: {
        type: String,
        min: 3,
        max: 55
    },
    phoneNumber: {
        type: String,
        length: 13
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024
    },
    address: addressSchema,
    role: {
        type: String,
        enum: ['ADMIN', 'MODERATOR', 'SELLER', 'CLIENT', 'DRIVER', 'MANAGER']
    },
    discount: Number
})

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const userSchema = {
        firstName: Joi.string().min(3).max(55),
        lastName: Joi.string().min(3).min(55),
        phoneNumber: Joi.string().length(13),
        password: Joi.string().min(6).max(1024),
        addressId: Joi.string(),
        role: Joi.string(),
        discount: Joi.Number()
    }
    return Joi.validate(user, userSchema)
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;