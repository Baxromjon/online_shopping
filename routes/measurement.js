const express = require('express')
const router = express.Router()
const { validateMeasurement, Measurement } = require('../models/measurement')

router.get('/', async (req, res) => {
    const measurement = await Measurement.find().sort('name')
    res.send(measurement);
})

router.post('/', async (req, res) => {
    const { error } = validateMeasurement(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let measurement = new Measurement({
        name: req.body.name
    })

    measurement = await measurement.save()
    res.send('Successfully added')
})

router.put('/:id', async (req, res) => {
    const { error } = validateMeasurement(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const measurement = await Measurement.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!measurement)
        return res.status(400).send('Measurement not found by given Id')
    res.send('Successfully edited')
})

router.get('/:id', async (req, res) => {
    const measurement = await Measurement.findById(req.params.id)
    if (!measurement)
        return res.status(400).send('Measurement not found')

    res.send(measurement)
})

router.delete('/:id', async (req, res) => {
    const measurement = await Measurement.findByIdAndRemove(req.params.id)
    if (!measurement)
        return res.status(400).send('Measurement not found by given Id')

    res.send('Successfully deleted')
})

module.exports = router;