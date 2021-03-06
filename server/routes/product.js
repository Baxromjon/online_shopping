const express = require('express')
const router = express.Router()
const { validateProduct, Product } = require('../models/product')
const { Measurement } = require('../models/measurement')
const { Category } = require('../models/category')
const cors = require('cors')
const multer = require('multer')
const { Detail } = require('../models/detail')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../server/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false)
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/allProducts', cors(), async (req, res) => {
    const products = await Product.find().sort('name')
    res.send(products)
})

router.get('/byId/:id', cors(), async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product)
        return res.status(400).send('Product not found by given id')
})


router.post('/add', cors(), upload.array('photos[]', 10), async (req, res) => {
    const { error } = validateProduct(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const category = await Category.findById(req.body.categoryId)
    if (!category)
        return res.status(400).send('Category not found by given categoryId')
    const measurement = await Measurement.findById(req.body.measurementId)
    if (!measurement)
        return res.status(400).send('Measurement not found by given measurementId')
    let product = new Product({
        name: req.body.name,
        category: { _id: category._id, name: category.name },
        measurement: { _id: measurement._id, name: measurement.name },
        percent: req.body.percent,
        standardPrice: req.body.standardPrice,
        description: req.body.description,
        photo: req.files.path,
        cashback: req.body.cashback,
        monthlyRepayment: req.body.monthlyRepayment,
        warrantyMonth: req.body.warrantyMonth,
        price: req.body.standardPrice - (req.body.standardPrice * req.body.cashback)
    })
    // if (req.file) {
    //     product.photo = req.file.path
    // }
    if (req.files) {
        let path = ''
        req.files.forEach(function (files, index, arr) {
            path = path + files.path + ', '
        })
        path = path.substring(0, path.lastIndexOf(","))
        product.photo = path
    }
    await product.save()
    res.status(201).send('Successfully added')
})
router.put('/edit/:id', cors(), async (req, res) => {
    const { error } = validateProduct(req.body)
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
        category: { _id: category._id, name: category.name },
        measurement: { _id: measurement._id, name: measurement.name }
    }, { new: true })
    if (!product)
        return res.status(400).send('Product not found by given id')

    res.send('Successfully edited')
})
router.delete('/delete/:id', async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id)
    if (!product)
        return res.status(400).send('Product not found by given id')

    res.send('Successfully deleted')
})

module.exports = router;