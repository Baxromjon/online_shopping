const express = require('express')
const router = express.Router()
const { OutputProduct, validateOutputProduct } = require('../models/outputProduct')
const { OutputTrade } = require('../models/outputTrade')
const { PayType } = require('../models/payType')


router.get('/', async (req, res) => {
    const outputProduct = await OutputProduct.find().sort('outputTradeId')
    res.send(outputProduct)
});

router.post('/add', async (req, res) => {
    const { error } = validateOutputProduct(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const outputTrade = await OutputTrade.findById(req.body.outputTradeId)
    if (!outputTrade)
        return res.status(400).send('OutputTrade not found')
    const payType = await PayType.findById(req.body.payTypeId)
    if (!payType)
        return res.status(400).send('Paytype not found')
    let outputProduct = new OutputProduct({
        outputTrade: {
            _id: outputTrade._id,
            user: { _id: outputTrade.userId }
        },
        price: req.body.price,
        payType: { _id: payType._id, name: payType.name, currencyType: { _id: payType.currencyTypeId } },
        amount: req.body.amount,
        description: req.body.description
    })
    await outputProduct.save()
    res.status(201).send('Successfully saved')
});

module.exports = router;