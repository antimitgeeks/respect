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

// // npo`s list controller
// exports.npoList = async (req, res) => {
//     console.info('***************************************************Npo`s List Api************************************************');
//     try {
//         const params = req.body;
//         const result = await service.npoList(params);
//         return sendResponse(res, statusCode.OK, true, `Npo's ${SuccessMessage.LIST_FETCH}`, result);
//     } catch (error) {
//         console.error('Error in npo`s list api : ', error);
//         return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
//     }
// };


// // npo details by id controller
// exports.npoById = async (req, res) => {
//     console.info('***************************************************Npo By Id Api************************************************');
//     try {
//         const id = req.params.id;
//         const result = await service.npoById(id);
//         if (!result) {
//             return sendResponse(res, statusCode.NOT_FOUND, false, `Npo ${ErrorMessage.NOT_FOUND}`);
//         }
//         return sendResponse(res, statusCode.OK, true, `Npo ${SuccessMessage.FETCH}`, result);
//     } catch (error) {
//         console.error('Error in Npo by id api : ', error);
//         return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
//     }
// };

// // npo details update by id controller
// exports.npoUpdate = async (req, res) => {
//     console.info('***************************************************Npo Update By Id Api************************************************');
//     try {
//         const id = req.params.id;
//         const details = req.body;
//         // check Npo exist or not
//         const exist = await service.npoById(id);
//         if (!exist) {
//             return sendResponse(res, statusCode.NOT_FOUND, false, `Npo ${ErrorMessage.NOT_FOUND}`);
//         }
//         await service.npoUpdate(details, id);
//         return sendResponse(res, statusCode.OK, true, `Npo ${SuccessMessage.UPDATE}`);
//     } catch (error) {
//         console.error('Error in npo update by id api : ', error);
//         return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
//     }
// };

// // store delete by id controller
// exports.npoDelete = async (req, res) => {
//     console.info('***************************************************Npo Update By Id Api************************************************');
//     try {
//         const id = req.params.id;
//         const exist = await service.npoById(id);
//         if (!exist) {
//             return sendResponse(res, statusCode.NOT_FOUND, false, `Npo ${ErrorMessage.NOT_FOUND}`);
//         }
//         await service.npoDelete(id);
//         return sendResponse(res, statusCode.OK, true, `Npo ${SuccessMessage.DELETE}`);
//     } catch (error) {
//         console.error('Error in npo update by id api : ', error);
//         return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
//     }
// };
