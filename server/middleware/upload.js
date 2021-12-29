const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const path = require('path')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    }
});

let upload = multer({
    storage: storage,
    limits: {fileSize: maxSize},
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg"
        ) {
            callback(null, true)
        }else {
            console.log('only png or jpg file supported')
            callback(null, false)
        }
    }
});

module.exports = upload;