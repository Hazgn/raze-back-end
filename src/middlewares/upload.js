const multer = require('multer');
const response = require('../helper/response')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    }
});

let fileFilter = function (req, file, cb) {
    var allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb({
            success: false,
            message: 'Invalid file type. Only jpg, png image files are allowedd.'
        }, false);
    }
};
let obj = {
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024
    },
    fileFilter: fileFilter
};

const upload = multer(obj).single('image'); // upload.single('file')
exports.fileUpload = async (req, res, next) => {
    await upload(req, res, function (error) {
        if (error) { //instanceof multer.MulterError
            res.status(500);
            if (error.code == 'LIMIT_FILE_SIZE') {
                return response(res, { data: null, status: 400, message: 'File Size is too large. Allowed file size is 1Mb', error })
            } else if (error.code == 'ENOENT') {
                return response(res, { data: null, status: 500, message: 'no such file', error })
            } else {
                return response(res, { data: null, status: 500, message: 'General Error.', error })
            }
        }
        return next()

    })
};