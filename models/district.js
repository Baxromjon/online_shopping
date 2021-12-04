const mongoose = require('mongoose')
const Joi = require('joi')
const { regionSchema } = require('./region')
const { countrySchema } = require('./country')

const districtSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 55
    },
    region: {
        type: regionSchema,
        required: true
    },
    // country: {
    //     type: countrySchema,
    //     required: true
    // }
})
const District = mongoose.model('District', districtSchema);

function validateDistrict(district) {
    const districtSchema = {
        name: Joi.string().required().min(3).max(55),
        regionId: Joi.string().required(),
        // countryId: Joi.string().required()
    }
    return Joi.validate(district, districtSchema)
}

exports.districtSchema = districtSchema
exports.District = District
exports.validateDistrict = validateDistrict
