const express = require('express')
const router = express.Router()
const { validatePayment, Payment } = require('../models/payment')
const { User } = require('../models/users')
const { PayType } = require('../models/payType')

router.get('/', async (req, res) => {
    const payments = await Payment.find().sort('clientId')
    res.send(payments)
})

router.get('/getById/:id', async (req, res) => {
    const payment = await Payment.findById(req.params.id)
    if (!payment)
        return res.status(400).send('Payment not found')

    res.send(payment)
});

router.post('/add', async (req, res) => {
    const { error } = validatePayment(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const user = await User.findById(req.body.clientId)
    if (!user)
        return res.status(400).send('Client not found')
    const payType = await PayType.findById(req.body.payTypeId)
    if (!payType)
        return res.status(400).send('PayType not found')
    let payment = new Payment({
        amount: req.body.amount,
        monthlyAmount: req.body.monthlyAmount,
        remainingAmount: req.body.remainingAmount,
        monthlyPayDate: req.body.monthlyPayDate,
        client: { _id: user._id, firstName: user.firstName, lastName: user.lastName },
        payType: { _id: payType._id, name: payType.name, currencyType: { _id: payType.currencyTypeId } }
    })
    await payment.save();
    res.send('Successfully added')
})

module.exports = router;