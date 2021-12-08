const mongoose = require('mongoose')
const Joi = require('joi')

const measurementSchema=mongoose.Schema({
    name:{
        type:String
    }
})

const Measurement=mongoose.model('Measurement', measurementSchema);

function validateMeasurement(measurement){
    const measurementSchema={
        name:Joi.string()
    }
    return Joi.validate(measurement, measurementSchema);
}

exports.measurementSchema=measurementSchema;
exports.Measurement=Measurement;
exports.validateMeasurement=validateMeasurement;