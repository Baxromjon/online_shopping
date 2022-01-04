const mongoose = require('mongoose')
const Joi = require('joi')
const { outputTradeSchema } = require('./outputTrade')
const { payTypeSchema } = require('./payType')

const outputProductSchema = new mongoose.Schema({
    outputTrade: { type: outputTradeSchema, required: true },
    price: Number,
    payType: { type: payTypeSchema, required: true },
    amount: { type: Number, required: true },
    description:String
});

const OutputProduct=mongoose.model('OutputProduct', outputProductSchema)

function validateOutputProduct(outputProduct){
    const outputProductSchema={
        outputTradeId:Joi.string().required(),
        price:Joi.number(),
        payTypeId:Joi.string().required(),
        amount:Joi.number().required(),
        description:Joi.string()
    }
    return Joi.validate(outputProduct, outputProductSchema)
};

exports.outputProductSchema=outputProductSchema;
exports.OutputProduct=OutputProduct;
exports.validateOutputProduct=validateOutputProduct;