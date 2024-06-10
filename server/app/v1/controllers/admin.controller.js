const service = require("../services/admin.service.js");
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const statusCode = require("../constants/statusCodes.js");

// add npo controller
exports.createNpo = async (req, res) => {
    console.info('***************************************************Create Npo Api************************************************');
    const details = req.body;
    try {
        // check email already used
        const emailExist = await service.npoByEmail(details.email);
        if (emailExist) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Email ${ErrorMessage.ALREADY_EXIST}`);
        }
        // check npo name already exist 
        const exist = await service.npoByName(details.name);
        if (exist) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Npo ${ErrorMessage.ALREADY_EXIST}`);
        }
        // add new npo
        const result = await service.addNpo(details);
        if (!result) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Npo ${ErrorMessage.NOT_CREATED}`);
        }
        return sendResponse(res, statusCode.OK, true, `Npo ${SuccessMessage.CREATED}`, result);
    } catch (error) {
        console.error('Error in create npo api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

// npo`s list controller
exports.npoList = async (req, res) => {
    console.info('***************************************************Npo`s List Api************************************************');
    try {
        const params = req.body;
        const result = await service.npoList(params);
        return sendResponse(res, statusCode.OK, true, `Npo's ${SuccessMessage.LIST_FETCH}`, result);
    } catch (error) {
        console.error('Error in npo`s list api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};


// npo details by id controller
exports.npoById = async (req, res) => {
    console.info('***************************************************Npo By Id Api************************************************');
    try {
        const id = req.params.id;
        const result = await service.npoById(id);
        if (!result) {
            return sendResponse(res, statusCode.NOT_FOUND, false, `Npo ${ErrorMessage.NOT_FOUND}`);
        }
        return sendResponse(res, statusCode.OK, true, `Npo ${SuccessMessage.FETCH}`, result);
    } catch (error) {
        console.error('Error in Npo by id api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

// npo details update by id controller
exports.npoUpdate = async (req, res) => {
    console.info('***************************************************Npo Update By Id Api************************************************');
    try {
        const id = req.params.id;
        const details = req.body;
        // check Npo exist or not
        const exist = await service.npoById(id);
        if (!exist) {
            return sendResponse(res, statusCode.NOT_FOUND, false, `Npo ${ErrorMessage.NOT_FOUND}`);
        }
        await service.npoUpdate(details, id);
        return sendResponse(res, statusCode.OK, true, `Npo ${SuccessMessage.UPDATE}`);
    } catch (error) {
        console.error('Error in npo update by id api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

// store delete by id controller
exports.npoDelete = async (req, res) => {
    console.info('***************************************************Npo Update By Id Api************************************************');
    try {
        const id = req.params.id;
        const exist = await service.npoById(id);
        if (!exist) {
            return sendResponse(res, statusCode.NOT_FOUND, false, `Npo ${ErrorMessage.NOT_FOUND}`);
        }
        await service.npoDelete(id);
        return sendResponse(res, statusCode.OK, true, `Npo ${SuccessMessage.DELETE}`);
    } catch (error) {
        console.error('Error in npo update by id api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};
