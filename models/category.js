const Joi = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 55
    },
    index: {
        type: String
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
})

const Category = mongoose.model('Category', categorySchema)

function validateCategory(category) {
    const categorySchema = {
        name: Joi.string().min(3).max(55),
        index: Joi.string(),
        parentCategoryId: Joi.string()
    }
    return Joi.validate(category, categorySchema)
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validateCategory = validateCategory;