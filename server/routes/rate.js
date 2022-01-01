const express = require('express')
const router = express.Router()
const { Rate, validateRate } = require('../models/rate')
const { Product } = require('../models/product')
const { Criteria } = require('../models/criteria')


router.get('/', async (req, res) => {
    const rates = await Rate.find().sort('name')
    res.send(rates)
})

router.post('/add', async (req, res) => {
    const { error } = validateRate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const product = await Product.findById(req.body.productId)
    if (!product)
        return res.status(400).send('Product not found by given productId')
    const criteria = await Criteria.findById(req.body.criteriaId)
    if (!criteria)
        return res.status(400).send('Criteria not found by given criteriaId')
    let rate = new Rate({
        starCount: req.body.starCount,
        product: { _id: product._id, name: product.name },
        criteria: { _id: criteria._id, name: criteria.name, negative: criteria.negative, forClient: criteria.forClient }
    })
    await rate.save()
    res.status(201).send('Successfully added')
});

router.put('/edit/:id', async (req, res) => {
    const { error } = validateRate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const product = await Product.findById(req.body.productId)
    if (!product)
        return res.status(400).send('Product not found by given productId')
    const criteria = await Criteria.findById(req.body.criteriaId)
    if (!criteria)
        return res.status(400).send('Criteria not found by given criteriaId')
    const rates = await Rate.findByIdAndUpdate(req.params.id, {
        starCount: req.body.starCount,
        product: { _id: product._id, name: product.name },
        criteria: { _id: criteria._id, name: criteria.name }
    }, { new: true })
    if (!rates)
        res.status(400).send('Rate not found by given Id')

    res.send('Successfully edited')
})

module.exports = router;