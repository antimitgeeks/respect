const multer = require('multer');
const path = require('path');
const fs = require('fs');
const adminService = require('../services/admin.service')

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const npoId = req.params.id;
        const type = req.query.type;
        const dir = `app/v1/utils/images/${npoId}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const imageType = req.query.type; // eg., 'logo'
        cb(null, `${imageType}${path.extname(file.originalname)}`);
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit size to 1MB
    fileFilter: function (req, file, cb) {
        checkFileType(req, file, cb);
    }
}).single('image');

// Check File Type
async function checkFileType(req, file, cb) {

    // check npo exist or not 
    const exist = await adminService.npoById(req.params.id);
    if (!exist) {
        cb({ status: false, message: 'Error: Npo Not Exist.' });
    }
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb({ status: false, message: 'Error: Images Only.' });
    }
}

module.exports = upload;
