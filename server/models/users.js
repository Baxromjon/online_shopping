const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')
const { districtSchema } = require('../models/district')

const Role = Object.freeze({
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    SELLER: 'seller',
    MANAGER: 'manager',
    CLIENT: 'client',
    DRIVER: 'driver'
});

const userSchema =new mongoose.Schema({
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
    district: districtSchema,
    street: { type: String, min: 3, max: 55 },
    home: { type: String },
    role: {
        type: String,
        enum: Object.values(Role)
    },
    discount: Number,
    isAdmin: Boolean,
    isEnable: {
        type: Boolean,
        default: true
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const userSchema = {
        firstName: Joi.string().min(3).max(55),
        lastName: Joi.string().min(3).max(55),
        phoneNumber: Joi.string().length(13),
        password: Joi.string().min(6).max(1024),
        districtId: Joi.string(),
        street: Joi.string().min(3).max(55),
        home: Joi.string(),
        role: Joi.string(),
        discount: Joi.number(),
        isAdmin: Joi.boolean(),
        isEnable:Joi.boolean(),
    }
    return Joi.validate(user, userSchema)
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;
exports.Role = Role;