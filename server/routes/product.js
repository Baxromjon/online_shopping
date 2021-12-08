const express = require('express')
const router = express.Router()
const { validateProduct, Product } = require('../models/product')
const { Measurement } = require('../models/measurement')
const { Category } = require('../models/category')

router.get('/', async (req, res) => {
    const products = await Product.find().sort('name')
    res.send(products)
})

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product)
        return res.status(400).send('Product not found by given id')
})

router.post('/', async (req, res) => {
    const { error } = validateProduct(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const category = await Category.findById(req.body.categoryId)
    if (!category)
        return res.status(400).send('Category not found by given productId')
    const measurement = await Measurement.findById(req.body.measurementId)
    if (!measurement)
        return res.status(400).send('Measurement not found by given measurementId')
    let product = new Product({
        name: req.body.name,
        category: category._id,
        measurement: measurement._id,
        percent: req.body.percent,
        standardPrice: req.body.standardPrice
    })
    product = await product.save()
    res.status(201).send('Successfully added')
})

module.exports = router;