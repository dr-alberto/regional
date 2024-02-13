const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, 'public'))
    },
    filename: (req, file, callback) => {
        callback(null, req.user.id + '_' + Date.now() + path.extname(file.originalname))
    }
});

module.exports.upload = multer({ storage: storage });