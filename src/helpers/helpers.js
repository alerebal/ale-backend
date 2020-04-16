const helpers = {}
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'uploads',
    // filename: (req, file, cb) => {
    //     cb(null, `${Date.now()}-${file.originalname}`);
    // }
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


module.exports = helpers;