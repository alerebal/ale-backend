const helpers = {}
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary');

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
})

helpers.multer = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpg|jpeg|png|gif/;
        const mimetypes = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetypes && extname) {
            return cb(null, file)
        } else {
            return cb('Error extension')
        }
    }
}).single('image');

helpers.cloud = cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})


module.exports = helpers;