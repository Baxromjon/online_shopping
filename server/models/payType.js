const mongoose = require('mongoose')
const Joi = require('joi')
const { currencyTypeSchema } = require('../models/currencyType')

const payTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    currencyType: {
        type: currencyTypeSchema,
        required: true
    }
})

const PayType = mongoose.model('PayType', payTypeSchema);

function validatePayType(paytype) {
    const payTypeSchema = {
        name: Joi.string().required(),
        currencyTypeId: Joi.string().required()
    }
    return Joi.validate(paytype, payTypeSchema)
}

exports.payTypeSchema = payTypeSchema;
exports.PayType = PayType;
exports.validatePayType = validatePayType;