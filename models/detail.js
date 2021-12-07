const mongoose = require('mongoose')
const Joi = require('joi')

const detailSchema = mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 55
    }
})

const Detail = mongoose.model('Detail', detailSchema)

function validateDetail(detail) {
    const detailSchema = {
        name: Joi.string().min(3).max(55)
    }
    return Joi.validate(detail, detailSchema)
}

exports.detailSchema = detailSchema;
exports.Detail = Detail;
exports.validateDetail = validateDetail;