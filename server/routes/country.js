const express = require('express');
const router = express.Router();
const { Country, validateCountry } = require('../models/country')
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
    const countries = await Country.find().sort('name')
    res.send(countries);
});

router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('invalid id');
    const country = await Country.findById(req.params.id);
    if (!country)
        return res.status(400).send('country not found!')

    return res.send(country)
})

router.post('/', async (req, res) => {
    const { error } = validateCountry(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let country = new Country({
        name: req.body.name
    })

    country = await country.save();
    res.status(200).send('successfully added')
});

router.put('/:id', async (req, res) => {
    const { error } = validateCountry(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let country = await Country.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!country)
        return res.status(400).send('country not found!');
    res.send('successfully edited!')
})

router.delete('/:id', async (req, res) => {
    let country = await Country.findByIdAndRemove(req.params.id);
    if (!country)
        return res.status(400).send('Country not found with given ID!')

    return res.send('successfully deleted!')
})


module.exports = router;