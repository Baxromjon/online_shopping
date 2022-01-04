const express = require('express')
const router = express.Router()
const { Order, validateOrder } = require('../models/order')
const { User } = require('../models/users')
const { Payment } = require('../models/payment')


router.get('/', async (req, res) => {
    const order = await Order.find().sort('createdAt')
    res.send(order)
});

router.get('/getById/:id', async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order)
        return res.status(400).send('Order not found by given Id')

    res.send(order)
})
router.post('/add', async (req, res) => {
    const { error } = validateOrder(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const user = await User.findById(req.body.userId)
    if (!user)
        return res.status(400).send('Client not found by given userId')
    const payment = await Payment.findById(req.body.paymentId)
    if (!payment)
        return res.status(400).send('Payment not found by given payment Id')
    let order = new Order({
        user: { _id: user._id, firstName: user.firstName, lastName: user.lastName },
        totalPrice: req.body.totalPrice,
        payment: { _id: payment._id, amount: payment.amount },
        totalDiscountPrice: req.body.totalDiscountPrice
    })
    await order.save()
    res.status(201).send('The order was successfully completed')
})

router.put('/editOrderStatus/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, {
        orderStatus: req.body.orderStatus
    }, { new: true })
    if (!order)
        return res.status(400).send('Order not found by given Id')

    res.send('Status successfully edited!')

})



module.exports = router;