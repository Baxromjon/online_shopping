const mongoose = require('mongoose')
const { productSchema } = require('./product')
const { criteriaSchema } = require('./criteria')
const Joi = require('joi')

const rateSchema = mongoose.Schema({
    starCount: Number,
    product: { type: productSchema },
    criteria: { type: criteriaSchema }
});

const Rate = mongoose.model('Rate', rateSchema);

function validateRate(rate) {
    const rateSchema = {
        starCount: Joi.number(),
        productId: Joi.string(),
        criteriaId: Joi.string()
    }
    return Joi.validate(rate, rateSchema)
}

exports.Rate=Rate;
exports.rateSchema=rateSchema;
exports.validateRate=validateRate;