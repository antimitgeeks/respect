const adminService = require("../services/admin.service.js");
const service = require("../services/npos.service.js");
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const statusCode = require("../constants/statusCodes.js");
const path = require("path")
const fs = require("fs")

// add npo page controller
exports.addPage = async (req, res) => {
    console.info('***************************************************Add Npo Page Api************************************************');
    const details = req.body;
    try {
        const npoId = req.params.id;
        // check npo exist or not   
        const exist = await adminService.npoById(npoId);
        if (!exist) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Npo ${ErrorMessage.NOT_FOUND}`);
        }
        // add npo page
        await service.addPage(details, npoId);
        return sendResponse(res, statusCode.OK, true, `Page ${SuccessMessage.SAVED}`);
    } catch (error) {
        console.error('Error in add npo page api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

// npo page details by id controller
exports.getPage = async (req, res) => {
    console.info('***************************************************Npo Page By Id Api************************************************');
    try {
        const id = req.params.id;
        const result = await service.getPage(id);
        return sendResponse(res, statusCode.OK, true, `Npo Page ${SuccessMessage.FETCH}`, result);
    } catch (error) {
        console.error('Error in Npo page by id api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

// npo page image controller
exports.getPageImage = async (req, res) => {
    console.info('***************************************************Npo Page Image By Id Api************************************************');
    try {
        const id = req.params.id;
        const type = req.query.type;
        // let filePath = path.join(__dirname, `../utils/images/${id}/${type}`);
        const imageDir = path.join(__dirname, '../utils', 'images', id);
        if (!fs.existsSync(imageDir)) {
            return res.status(404).send('Image not found');
        }
        fs.readdir(imageDir, (err, files) => {
            if (err || files.length === 0) {
                return res.status(404).send('Image not found');
            }

            const file = files.find(f => path.basename(f, path.extname(f)) === type);
            if (!file) {
                return res.status(404).send('Image not found');
            }
            const imagePath = path.join(imageDir, file);
            res.sendFile(path.resolve(imagePath));
        });
        // return sendResponse(res, statusCode.OK, true, `Npo Page Image ${SuccessMessage.FETCH}`, result);
    } catch (error) {
        console.error('Error in Npo page by id api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};


