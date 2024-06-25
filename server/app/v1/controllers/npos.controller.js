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

// npo page details by id controller
exports.getPageShopify = async (req, res) => {
    console.info('***************************************************Npo shopify Page By Id Api************************************************');
    try {
        const id = req.params.id;
        const exist = await adminService.npoByShopifyId(id);
        if (!exist) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Npo ${ErrorMessage.NOT_FOUND}`);
        }
        const result = await service.getPage(exist.id);
        return sendResponse(res, statusCode.OK, true, `Npo Page ${SuccessMessage.FETCH}`, result);
    } catch (error) {
        console.error('Error in shopify page by id api : ', error);
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
            res.set('Content-Type', 'image/*');
            res.sendFile(path.resolve(imagePath));
        });
    } catch (error) {
        console.error('Error in Npo page image by id api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

// npo page image controller
exports.getShopifyPageImage = async (req, res) => {
    console.info('***************************************************Npo Shopify Page Image By Id Api************************************************');
    try {
        const id = req.params.id;
        const type = req.query.type;
        // get npo details by shopify page id
        const pageDetails = await adminService.npoByShopifyId(id);
        if (!pageDetails) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Npo ${ErrorMessage.NOT_FOUND}`);
        }
        const imageDir = path.join(__dirname, '../utils', 'images', pageDetails.id?.toString());
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
            res.set('Content-Type', 'image/*');
            res.sendFile(path.resolve(imagePath));
        });
    } catch (error) {
        console.error('Error in Shopify page image by id api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};


// order complete web hook
exports.orderCompleteWebhook = async (req, res) => {
    console.info('***************************************************Order Complete Webhook************************************************');
    try {
        const payload = req.body;
        await service.orderComplete(payload);
        return sendResponse(res, statusCode.OK, true, SuccessMessage.CREATED);
    } catch (error) {
        console.error('Error in order complete : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

// records controller
exports.records = async (req, res) => {
    console.info('***************************************************NPO Record Api************************************************');
    try {
        const npoId = req.params.id;
        const details = req.body;
        // check npo exist or not   
        const exist = await adminService.npoById(npoId);
        if (!exist) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Npo ${ErrorMessage.NOT_FOUND}`);
        }
        const result = await service.records(npoId, details);
        return sendResponse(res, statusCode.OK, true, `Npo Record ${SuccessMessage.LIST_FETCH}`, result);
    } catch (error) {
        console.error('Error in npo record api: ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

// valid npos controller
exports.validNpos = async (req, res) => {
    console.info('***************************************************Valid Npos Api************************************************');
    try {
        const npos = req.body?.npos;
        const result = await service.validNpos(npos);
        return sendResponse(res, statusCode.OK, true, `Npos ${SuccessMessage.FETCH}`, result);
    } catch (error) {
        console.error('Error in valid npos api: ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};


