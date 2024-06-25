const service = require("../services/auth.service");
const adminService = require("../services/admin.service.js");
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const statusCode = require("../constants/statusCodes.js");

// login controller
exports.login = async (req, res) => {
    console.info('***************************************************Login Api************************************************');
    try {
        const details = req.body;
        const result = await service.login(details);
        if (!result.status) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, result.message);
        }
        return sendResponse(res, statusCode.OK, true, SuccessMessage.LOGIN, result.message);
    } catch (error) {
        console.error('Error in login api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

//  register controller
exports.register = async (req, res) => {
    console.info('***************************************************Register Api************************************************');
    try {
        const details = req.body;
        const result = await service.register(details);
        return sendResponse(res, statusCode.OK, true, `${details.role} ${SuccessMessage.CREATED}`, result);
    } catch (error) {
        console.error('Error in register api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

//  resetPassword controller
exports.resetPassword = async (req, res) => {
    console.info('***************************************************Reset Password Api************************************************');
    try {
        const email = req.body.email;
        const role = req.body.role;
        let emailExist;
        // check for admin
        if (role === 'admin') {
            emailExist = await service.userExistByEmail(email);
            if (!emailExist) {
                return sendResponse(res, statusCode.BAD_REQUEST, false, `User ${ErrorMessage.NOT_FOUND}`);
            }
        } else {
            emailExist = await adminService.npoByEmail(email);
            if (!emailExist) {
                return sendResponse(res, statusCode.BAD_REQUEST, false, `User ${ErrorMessage.NOT_FOUND}`);
            }
        }
        await service.resetPassword(emailExist.email, emailExist.id, role);
        return sendResponse(res, statusCode.OK, true, SuccessMessage.RESET_PASSWORD);
    } catch (error) {
        console.error('Error in reset password api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

//  forgotPassword controller
exports.forgotPassword = async (req, res) => {
    console.info('***************************************************Forgot Password Api************************************************');
    try {
        const id = req.params.id;
        const password = req.body.password;
        const role = req.body.role;
        if (role === 'admin') {
            const userExist = await service.userExistById(id);
            if (!userExist) {
                return sendResponse(res, statusCode.BAD_REQUEST, false, `User ${ErrorMessage.NOT_FOUND}`);
            }
        } else {
            const userExist = await adminService.npoById(id);
            if (!userExist) {
                return sendResponse(res, statusCode.BAD_REQUEST, false, `User ${ErrorMessage.NOT_FOUND}`);
            }
        }
        await service.forgotPassword(id, password, role);
        return sendResponse(res, statusCode.OK, true, SuccessMessage.FORGOT_PASSWORD);
    } catch (error) {
        console.error('Error in forgot password api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};
