const Joi = require('joi');
const mongoose = require('mongoose');
const { countrySchema } = require('./country')

const regionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 55
    },
    country: {
        type: countrySchema
    }

})
const Region=mongoose.model('Region', regionSchema);

function validateRegion(region){
    const regionSchema={
        name:Joi.string().min(3).max(55).required(),
        countryId:Joi.string()
    }
    return Joi.validate(region, regionSchema)
}

exports.Region=Region;
exports.validateRegion=validateRegion;
exports.regionSchema=regionSchema;