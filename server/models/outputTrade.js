const mongoose = require('mongoose')
const Joi = require('joi')
const { userSchema } = require('../models/users')

const outputTradeSchema = new mongoose.Schema({
    user: { type: userSchema, required: true },
    date: { type: Date, default: Date.now() },
    description: String,
    factureNumber:Number
})

const OutputTrade = mongoose.model('OutputTrade', outputTradeSchema)

function validateOutputTrade(outputTrade) {
    const outputTradeSchema = {
        userId: Joi.string().required(),
        description: Joi.string(),
        factureNumber:Joi.number()
    }
    return Joi.validate(outputTrade, outputTradeSchema)
}

exports.outputTradeSchema = outputTradeSchema;
exports.OutputTrade = OutputTrade;
exports.validateOutputTrade = validateOutputTrade;