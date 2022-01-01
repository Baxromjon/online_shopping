const mongoose = require('mongoose')
const { userSchema } = require('../models/users')
const { payTypeSchema } = require('../models/payType')
const Joi = require('joi')

const paymentSchema =new mongoose.Schema({
    amount: Number,
    monthlyAmount: Number,
    remainingAmount: Number,
    payDate: {type:Date, default: Date.now() },
    monthlyPayDate: Date,
    description: String,
    client: userSchema,
    payType: payTypeSchema
});

const Payment = mongoose.model('Payment', paymentSchema)

function validatePayment(payment) {
    const paymentSchema = {
        amount: Joi.number(),
        monthlyAmount: Joi.number(),
        remainingAmount: Joi.number(),
        payDate: Joi.date(),
        monthlyPayDate: Joi.date(),
        description: Joi.string(),
        clientId: Joi.string(),
        payTypeId: Joi.string()
    }
    return Joi.validate(payment, paymentSchema)
}

exports.paymentSchema = paymentSchema;
exports.Payment = Payment;
exports.validatePayment = validatePayment;