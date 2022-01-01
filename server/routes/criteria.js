const express = require('express');
const router = express.Router()
const { Criteria, validateCriteria } = require('../models/criteria');

router.get('/', async (req, res) => {
    const criterias = await Criteria.find().sort('name')
    res.send(criterias)
});

router.post('/add', async (req, res) => {
    const { error } = validateCriteria(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    let criteria = await Criteria.findOne({}, { name: req.body.name })
    if (criteria)
        return res.send('AllReady added')
    criteria = new Criteria({
        name: req.body.name,
        description: req.body.description,
        negative: req.body.negative,
        forClient: req.body.forClient
    })

    await criteria.save()
    res.send('Successfully saved')
});

router.put('/edit/:id', async (req, res) => {
    const { error } = validateCriteria(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const criteria = await Criteria.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        negative: req.body.negative,
        forClient: req.body.forClient
    }, { new: true })
    if (!criteria)
        return res.status(400).send('Criteria not found by given id')

    await criteria.save()
    res.send('Successfully edited')
});

router.delete('/delete/:id', async (req, res) => {
    const criteria = await Criteria.findByIdAndRemove(req.params.id)
    if (!criteria)
        return res.status(400).send('Criteria not found by given id')

    res.send('Successfully deleted')
});

router.get('/:id', async (req, res) => {
    const criteria = await Criteria.findById(req.params.id)
    if (!criteria)
        return res.status(400).send('Criteria not found by given id')

    res.send(criteria)
})



module.exports = router;