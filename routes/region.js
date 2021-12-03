const express = require('express')
const router = express.Router();
const { Region, validateRegion } = require('../models/region');
const { Country } = require('../models/country');


router.get('/', async (req, res) => {
    const regions = await Region.find().sort('name')
    res.send(regions);
});

router.get('/:id', async (req, res) => {
    const region = await Region.findById(req.params.id)
    if (!region)
        return res.status(400).send('Region not found with given id')

    return res.send(region)
})

router.post('/', async (req, res) => {
    const { error } = validateRegion(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    let country = await Country.findById(req.body.countryId)
    if (!country)
        return res.status(400).send('Country not found with given countryId')

    let region = new Region({
        name: req.body.name,
        country: {
            _id: country._id,
            name: country.name
        }
    })
    region = await region.save();
    res.status(201).send('Successfully added')
})

module.exports = router;