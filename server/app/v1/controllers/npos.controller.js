const adminService = require("../services/admin.service.js");
const service = require("../services/npos.service.js");
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const statusCode = require("../constants/statusCodes.js");

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

