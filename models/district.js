const mongoose = require('mongoose')
const Joi = require('joi')
const { regionSchema } = require('./region')

const districtSchema = mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 55
    },
    region: {
        type: regionSchema
    }
})
const District = mongoose.model('District', districtSchema);

function validateDistrict(district) {
    const districtSchema = {
        name: Joi.string().min(3).max(55),
        regionId: Joi.string().required()
    }
    return Joi.validate(district, districtSchema)
}

exports.districtSchema = districtSchema
exports.District = District
exports.validateDistrict = validateDistrict
