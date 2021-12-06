const Joi = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 55
    },
    index: {
        type: String,
        required: true
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
})

const Category = mongoose.model('Category', categorySchema)

function validateCategory(category) {
    const categorySchema = {
        name: Joi.string().required().min(3).max(55),
        index: Joi.string().required(),
        parentCategoryId: Joi.string()
    }
    return Joi.validate(category, categorySchema)
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validateCategory = validateCategory;