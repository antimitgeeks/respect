const express = require("express");
const controllers = require("../controllers/npos.controller.js");
const router = express.Router();
const upload = require('../middleware/uploadMiddleware.js')
// const validation = require("../validations/admin.validation.js");
const authValidation = require("../validations/auth.validation.js");
const statusCode = require("../constants/statusCodes.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const { sendResponse } = require("../utils/sendResponse.js");


router.post('/page/:id', authValidation.id, controllers.addPage);
router.post('/page-details/:id', authValidation.id, controllers.getPage);
router.post('/shopify/page-details/:id', controllers.getPageShopify);
router.post('/upload/:id', authValidation.id, authValidation.npoImageType, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (req.file == undefined) {
                return sendResponse(res, statusCode.BAD_REQUEST, false, `No file selected.`);

            } else {
                return sendResponse(res, statusCode.OK, true, `File ${SuccessMessage.UPLOADED}`);
            }
        }
    });
});
router.get('/image/:id', authValidation.id, authValidation.npoImageType, controllers.getPageImage);
router.get('/shopify/image/:id', authValidation.id, authValidation.npoImageType, controllers.getShopifyPageImage);


module.exports = router;
