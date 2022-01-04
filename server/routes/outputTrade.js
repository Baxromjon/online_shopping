const express = require('express')
const router = express.Router();
const { OutputTrade, validateOutputTrade } = require('../models/outputTrade');
const { User } = require('../models/users')

router.get('/', async (req, res) => {
    const ot = await OutputTrade.find().sort('userId')
    res.send(ot)
});

router.post('/add', async (req, res) => {
    const number = Math.floor(Math.random() * 100000);
    const { error } = validateOutputTrade(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const client = await User.findById(req.body.userId)
    if (!client)
        return res.status(400).send('Client not found')
    let outputTrade = new OutputTrade({
        user: { _id: client._id, firstName: client.firstName, lastName: client.lastName },
        description: req.body.description,
        factureNumber: number
    })
    await outputTrade.save()
    res.status(201).send('Successfully saved')
});

router.get('/getById/:id', async (req, res) => {
    const outputTrade = await OutputTrade.findById(req.params.id)
    if (!outputTrade)
        return res.status(400).send('Output Trade not found')

    res.send(outputTrade)
})

router.put('/edit/:id', async (req, res) => {
    const { error } = validateOutputTrade(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const client = await User.findById(req.body.userId)
    if (!client)
        return res.status(400).send('Client not found')
    const outputTrade = await OutputTrade.findByIdAndUpdate(req.params.id, {
        user: { _id: client._id, firstName: client.firstName, lastName: client.lastName },
        description: req.body.description
    }, { new: true })
    if (!outputTrade)
        return res.status(400).send('Output Trade not found!')

    res.send('Successfully edited')
})

module.exports = router;