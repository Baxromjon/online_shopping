const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    filePath: String
}, {timestamps: true})

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
module.exports = ImageSchema;