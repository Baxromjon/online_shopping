const mongoose = require('mongoose')
const Joi = require('joi')
const { userSchema } = require('./users')
const { paymentSchema } = require('./payment')

const Status = Object.freeze({
    NEW: 'new',
    WAITING: 'waiting',
    ACCEPTED: 'accepted',
    IN_PROGRESS: 'inProgress',
    CANCELLED: 'cancelled',
    CLOSED: 'closed',
})
const orderSchema = new mongoose.Schema({
    user: {
        type: userSchema
    },
    totalPrice: {
        type: Number,
        required: true
    },
    payment: {
        type: paymentSchema
    },
    orderStatus: {
        type: String,
        enum: Object.values(Status),
        default: 'new'
    },
    totalDiscountPrice: {
        type: Number,
        required: true
    },
    dayOfOrder: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

function validateOrder(order) {
    const orderSchema = {
        userId: Joi.string(),
        totalPrice: Joi.number(),
        paymentId: Joi.string(),
        orderStatus: Joi.string(),
        totalDiscountPrice: Joi.number()
    }
    return Joi.validate(order, orderSchema)
}

exports.orderSchema = orderSchema;
exports.Order = Order;
exports.validateOrder = validateOrder;