const Joi = require('joi')
const mongoose = require('mongoose')
const { districtSchema } = require('./district')


const addressSchema = mongoose.Schema({
    street: {
        type: String,
        min: 3,
        max: 55
    },
    home: {
        type: String,
        min: 1,
        max: 5
    },
    district: {
        type: districtSchema
    }
})

const Address = mongoose.model('Address', addressSchema)

function validateAddress(address) {
    const addressSchema = {
        street: Joi.string().min(3).max(55),
        home: Joi.string().min(1).max(5),
        districtId: Joi.string().required()
    }
    return Joi.validate(address, addressSchema);
}
exports.Address = Address;
exports.validateAddress = validateAddress;
exports.addressSchema = addressSchema;