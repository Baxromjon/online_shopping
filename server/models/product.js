const mongoose = require('mongoose')
const Joi = require('joi')
const { categorySchema } = require('../models/category')
const { measurementSchema } = require('../models/measurement')
const { detailSchema } = require('../models/detail')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 55
    },
    category: {
        type: categorySchema,
        required: true
    },
    measurement: {
        type: measurementSchema,
        required: true
    },
    percent: Number,
    standardPrice: Number,
    photo: {
        type: String
    },
    description: {
        type: String,
        min: 10,
        max: 255
    },
    cashback: { type: Number },
    monthlyRepayment: { type: Number },
    warrantyMonth: { type: Number },
    // detail: { type: detailSchema },
    price:Number
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

function validateProduct(product) {
    const productSchema = {
        name: Joi.string().min(3).max(55),
        categoryId: Joi.string().required(),
        measurementId: Joi.string().required(),
        percent: Joi.number(),
        standardPrice: Joi.number(),
        photo: Joi.string(),
        description: Joi.string().min(10).max(255),
        cashback: Joi.number(),
        monthlyRepayment: Joi.number(),
        warrantyMonth: Joi.number(),
        // detailId: Joi.string(),
        price:Joi.string()
    }
    return Joi.validate(product, productSchema)
}

exports.productSchema = productSchema;
exports.Product = Product;
exports.validateProduct = validateProduct;