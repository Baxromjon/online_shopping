const express = require('express')
const { Country } = require('../models/country')
const router = express.Router()
const { District, validateDistrict } = require('../models/district')
const { Region } = require('../models/region')

router.get('/', async (req, res) => {
    const districts = await District.find().sort('name')
    res.send(districts)
})

router.get('/:id', async (req, res) => {
    const district = await District.findById(req.params.id)
    if (!district)
        return res.status(400).send('District not found by given id')
    res.send(district)
})

router.post('/', async (req, res) => {
    const { error } = validateDistrict(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    let region = await Region.findById(req.body.regionId);
    if (!region)
        return res.status(400).send('Region not found by given regionId')
    let district = new District({
        name: req.body.name,
        region: {
            _id: region._id,
            name: region.name
        }
    })
    district = await district.save();
    res.status(201).send('Successfully added!')
})

router.delete('/:id', async (req, res) => {
    const district = await District.findByIdAndRemove(req.params.id)
    if (!district)
        return res.send('District not found by given Id')

    res.send('Successfully deleted')
})

router.put('/:id', async (req, res) => {
    const { error } = validateDistrict(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const region = await Region.findById(req.body.regionId)
    if (!region)
        return res.status(400).send('Region not found by given regionId')
    const district = await District.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        region: {
            _id: region._id,
            name: region.name
        }
    }, { new: true })
    if (!district)
        return res.status(400).send('District not found by given id')
    res.send('Successfully edited!')
})



module.exports = router;