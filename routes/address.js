const express = require('express')
const router = express.Router()
const { Address, validateAddress } = require('../models/address')
const { District } = require('../models/district')

router.get('/', async (req, res) => {
    const address = await Address.find().sort('street')
    res.send(address)
})

router.post('/', async (req, res) => {
    const { error } = validateAddress(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const district = await District.findById(req.body.districtId)
    if (!district)
        return res.status(400).send('District not found by given districtId')
    let address = new Address({
        street: req.body.street,
        home: req.body.home,
        district: {
            _id: district._id,
            name: district.name
        }
    })
    address = await address.save()
    res.status(201).send('Successfully added!')
})

router.get('/:id', async (req, res) => {
    const address = await Address.findById(req.params.id)
    if (!address)
        return res.status(400).send('Address not found by given id')
    res.send(address)
})

router.put('/:id', async (req, res) => {
    const { error } = validateAddress(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const district = await District.findById(req.body.districtId)
    if (!district)
        return res.status(400).send('District not found by given districtId')
    const address = await Address.findByIdAndUpdate(req.params.id, {
        street: req.body.street,
        home: req.body.home,
        district: {
            _id: district._id,
            name: district.name
        }
    }, { new: true })
    if (!address)
        return res.status(400).send('Address not found by given id')
    res.send('Successfully edited')
})

router.delete('/:id', async (req, res) => {
    const address = await Address.findByIdAndRemove(req.params.id)
    if (!address)
        return res.status(400).send('Address not found by given id')
    res.send('Successfully deleted')
})

module.exports = router;