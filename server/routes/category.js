const express = require('express')
const router = express.Router()
const {categorySchema, Category, validateCategory} = require('../models/category')
const cors = require('cors')

router.get('/getAll', cors(), async (req, res) => {
    const category = await Category.find().populate("parentCategory")
    res.send(category)
})

router.post('/add', async (req, res) => {
    const {error} = validateCategory(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const parentCategory = await Category.findById(req.body.parentCategoryId)
    if (!parentCategory)
        return res.status(400).send('Parent category not found')

    let category = new Category({
        name: req.body.name,
        index: req.body.index,
        parentCategory: parentCategory._id
    })

    category = await category.save();

    res.status(201).send('Successfully added')
})

router.get('/byId/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category)
        return res.status(400).send('category not found by given Id')

    res.send(category)
})

router.put('/edit/:id', async (req, res) => {
    const {error} = validateCategory(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const parentCategory = await Category.findById(req.body.parentCategoryId)
    if (!parentCategory)
        return res.status(400).send('ParentCategory not found by given Id')
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        index: req.body.index,
        parentCategory: parentCategory._id
    }, {new: true})
    if (!category)
        return res.status(400).send('Category not found')

    res.send('Successfully edited')
})

router.delete('/delete/:id', async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id)
    if (!category)
        return res.status(400).send('Category not found')

    res.send('Successfully deleted')
})

module.exports = router