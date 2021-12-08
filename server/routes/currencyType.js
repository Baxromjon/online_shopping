const express = require('express')
const router = express.Router()
const { validateType, CurrencyType } = require('../models/currencyType')

router.get('/', async (req, res) => {
    const currencyType = await CurrencyType.find().sort('name')
    res.send(currencyType)
})

router.post('/', async (req, res) => {
    const { error } = validateType(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let currencyType = new CurrencyType({
        name: req.body.name,
        description: req.body.description
    })

    currencyType = await currencyType.save()
    res.status(201).send("successfully added")
})

router.get('/:id', async (req, res) => {
    const currencyType = await CurrencyType.findById(req.params.id)
    if (!currencyType)
        return res.status(400).send('Currency Type not found by given Id')
    res.send(currencyType)
})

router.put('/:id', async (req, res) => {
    const { error } = validateType(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const currencyType = await CurrencyType.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description
    }, { new: true })
    if (!currencyType)
        return res.status(400).send('Currency Type not found')
    res.send('Successfully edited')
})

router.delete('/:id', async (req, res) => {
    const currencyType = await CurrencyType.findByIdAndRemove(req.params.id)
    if (!currencyType)
        return res.status(400).send('Currency type not found by given id')

    res.send('Successfully deleted')
})

module.exports = router;