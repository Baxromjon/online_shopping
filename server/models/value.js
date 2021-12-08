const mongoose = require('mongoose')
const Joi = require('joi')
const { detailSchema } = require('../models/detail')

const valueSchema = mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 55
    },
    detail: detailSchema
})

const Value = mongoose.model('Value', valueSchema)

function validateValue(value) {
    const valueSchema = {
        name: Joi.string().min(3).max(55),
        detailId: Joi.string()
    }
    return Joi.validate(value, valueSchema)
}

exports.valueSchema = valueSchema;
exports.Value = Value;
exports.validateValue = validateValue;