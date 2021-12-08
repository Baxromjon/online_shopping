const express = require('express')
const router = express.Router()
const { validatePayType, PayType } = require('../models/payType')
const { CurrencyType } = require('../models/currencyType')

router.get('/', async (req, res) => {
    const payType = await PayType.find().sort('name')
    res.send(payType)
})

router.post('/', async (req, res) => {
    const { error } = validatePayType(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const currencyType = await CurrencyType.findById(req.body.currencyTypeId)
    if (!currencyType)
        return res.status(400).send('Currency PayType not found by given id')
    let payType = new PayType({
        name: req.body.name,
        currencyType: {
            _id: currencyType._id
        }
    })
    payType = await payType.save()
    res.status(201).send('Successfully added')
})

router.get('/:id', async (req, res) => {
    const payType = await PayType.findById(req.params.id)
    if (!payType)
        return res.status(400).send('PayType not found by given id')

    res.send(payType)
})

router.put('/:id', async (req, res) => {
    const { error } = validatePayType(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const currencyType = await CurrencyType.findById(req.body.currencyTypeId)
    if (!currencyType)
        return res.status(400).send('Currency Type not found by given Id')
    const payType = PayType.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        currencyType: currencyType._id
    }, { new: true })
    if (!payType)
        return res.status(400).send('PayType not found by given id')

    res.send('Successfully edited')
})

router.delete('/:id', async (req, res) => {
    const payType = await PayType.findByIdAndRemove(req.params.id)
    if (!payType)
        return res.status(400).send('PayType not found by given id')

    res.send('Successfully deleted')
})

module.exports = router;