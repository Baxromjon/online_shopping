const express = require('express')
const router = express.Router()
const {validateProduct, Product} = require('../models/product')
const {Measurement} = require('../models/measurement')
const {Category} = require('../models/category')
const cors = require('cors')

router.get('/allProducts', cors(), async (req, res) => {
    const products = await Product.find().sort('name')
    res.send(products)
})

router.get('/byId/:id', cors(), async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product)
        return res.status(400).send('Product not found by given id')
})

router.post('/add', cors(), async (req, res) => {
    const {error} = validateProduct(req.body)
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
        category: {_id: category._id, name: category.name},
        measurement: {_id: measurement._id, name: measurement.name},
        percent: req.body.percent,
        standardPrice: req.body.standardPrice
    })
    await product.save()
    res.status(201).send('Successfully added')
})
router.put('/edit/:id', async (req, res) => {
    const {error} = validateProduct(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId)
    if (!category)
        return res.status(400).send('Category not found')
    const measurement = await Measurement.findById(req.body.measurementId)
    if (!measurement)
        return res.status(400).send('Measurement not found')
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        standardPrice: req.body.standardPrice,
        percent: req.body.percent,
        category: {_id: category._id, name: category.name},
        measurement: {_id: measurement._id, name: measurement.name}
    }, {new: true})
    if (!product)
        return res.status(400).send('Product not found by given id')

    res.send('Successfully edited')
})
router.delete('/delete/:id', async (req, res) => {
    // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    const product = await Product.findByIdAndRemove(req.params.id)
    if (!product)
        return res.status(400).send('Product not found by given id')

    res.send('Successfully deleted')
})

module.exports = router;