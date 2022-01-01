const express = require('express')
const router = express.Router()
const { Value, validateValue } = require('../models/value')
const { Detail } = require('../models/detail')

router.get('/', async (req, res) => {
    const values = await Value.find().sort('name')
    res.send(values)
})

router.post('/', async (req, res) => {
    const { error } = validateValue(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const detail = await Detail.findById(req.body.detailId)
    if (!detail)
        return res.status(400).send('Detail not found by given detailId')
    let value = new Value({
        name: req.body.name,
        detail: {
            _id: detail._id, name: detail.name
        }
    })
    value = await value.save()
    res.send('Successfully added')
})

router.put('/:id', async (req, res) => {
    const { error } = validateValue(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const detail = await Detail.findById(req.body.detailId)
    if (!detail)
        return res.status(400).send('Detail not found by given detailId')
    const value = await Value.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        detailId: detail._id
    }, { new: true })
    if (!value)
        return res.status(400).send('Value not found by given Id')

    res.send('Successfully edited')
})

router.get('/:id', async (req, res) => {
    const value = await Value.findById(req.params.id)
    if (!value)
        return res.status(400).send('Value not found by given Id')

    res.send(value)
})

router.delete('/:id', async (req, res) => {
    const value = await Value.findByIdAndRemove(req.params.id)
    if (!value)
        return res.status(400).send('Value not found by given Id')

    res.send('Successfully deleted')
})

module.exports = router;