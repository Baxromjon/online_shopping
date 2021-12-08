const express = require('express')
const router = express.Router()
const { Detail, validateDetail } = require('../models/detail')

router.get('/', async (req, res) => {
    const details = await Detail.find().sort('name')
    res.send(details)
})

router.get('/:id', async (req, res) => {
    const detail = await Detail.findById(req.params.id)
    if (!detail)
        return res.status(400).send('Detail not found by given id')
    res.send(detail)
})

router.post('/', async (req, res) => {
    const { error } = validateDetail(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    let detail = await Detail({
        name: req.body.name
    })
    detail = await detail.save()
    res.status(201).send('Successfully added')
})

router.put('/:id', async (req, res) => {
    const { error } = validateDetail(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const detail = await Detail.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!detail)
        return res.status(400).send('Detail not found by given Id')

    res.send('Successfully edited')
})

router.delete('/:id', async (req, res) => {
    const detail = await Detail.findByIdAndRemove(req.params.id)
    if (!detail)
        return res.status(400).send('Detail not found by given Id')

    res.send('Successfully deleted')
})


module.exports = router;