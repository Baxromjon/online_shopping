const mongoose = require('mongoose')
const Joi = require('joi')

const currencyTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
})

const CurrencyType = mongoose.model('CurrencyType', currencyTypeSchema);

function validateType(currencyType) {
    const currencyTypeSchema = {
        name: Joi.string().required(),
        description: Joi.string().required()
    }
    return Joi.validate(currencyType, currencyTypeSchema)
}

exports.currencyTypeSchema = currencyTypeSchema;
exports.CurrencyType = CurrencyType;
exports.validateType = validateType;