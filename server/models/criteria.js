const mongoose = require('mongoose')
const Joi = require('joi')

const criteriaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    negative: {
        type: Boolean,
        required: true
    },
    forClient: {
        type: Boolean,
        required: true
    }
})

const Criteria = mongoose.model('Criteria', criteriaSchema)

function validateCriteria(criteria) {
    const criteriaSchema = {
        name: Joi.string().required(),
        description: Joi.string(),
        negative: Joi.boolean().required(),
        forClient: Joi.boolean().required()
    }
    return Joi.validate(criteria, criteriaSchema)
}

exports.criteriaSchema = criteriaSchema;
exports.Criteria = Criteria;
exports.validateCriteria = validateCriteria;