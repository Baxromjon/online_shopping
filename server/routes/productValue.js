const express = require('express')
const router = express.Router()
const { Product } = require('../models/product')
const { Value } = require('../models/value')
const { validate, ProductValue } = require('../models/productValues')
const { Category } = require('../models/category')
const { Measurement } = require('../models/measurement')

router.get('/', async (req, res) => {
    const pv = await ProductValue.find().sort('productId')
    res.send(pv)
})

router.post('/add', async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const product = await Product.findById(req.body.productId)
    if (!product)
        return res.status(400).send('Product not found')
    const value = await Value.findById(req.body.valueId)
    if (!value)
        return res.status(400).send('Value not found')
    const category = await Category.findById(product.categoryId)
    if (!category)
        return res.status(400).send('Category not found')
    const measurement = await Measurement.findById(product.measurementId)
    if (!measurement)
        return res.status(400).send('Measurement not found')
    let pv = new ProductValue({
        product: {
            _id: product._id, name: product.name,
            category: { _id: product.categoryId, name: category.name },
            measurement: { _id: product.measurementId, name: measurement.name }
        },
        value: { _id: value._id, name: value.name }
    })
    await pv.save()
    res.send('Successfully saved')
})

router.put('/edit/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const product = await Product.findById(req.body.productId)
    if (!product)
        return res.status(400).send('Product not found')
    const value = await Value.findById(req.body.valueId)
    if (!value)
        return res.status(400).send('Value not found')
    const pv = await ProductValue.findByIdAndUpdate(req.params.id, {
        product: { _id: product._id, name: product.name, category: { _id: product.categoryId }, measurement: { _id: product.measurementId } },
        value: { _id: value._id, name: value.name }
    }, { new: true })
    if (!pv)
        return res.status(400).send('Product values not found')
    res.send('Successfully edited')
});



module.exports = router