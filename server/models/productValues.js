const mongoose = require('mongoose')
const { productSchema } = require('../models/product')
const { valueSchema } = require('../models/value')
const Joi = require('joi')

const productValuesSchema = new mongoose.Schema({
    product: {
        type: productSchema,
        required: true
    },
    value: { type: valueSchema, required: true }
})

const ProductValue = mongoose.model('ProductValue', productValuesSchema)

function validate(productValue) {
    const productValuesSchema = {
        productId: Joi.string().required(),
        valueId: Joi.string().required()
    }
    return Joi.validate(productValue, productValuesSchema)
}

exports.productValuesSchema = productValuesSchema;
exports.ProductValue = ProductValue;
exports.validate = validate;