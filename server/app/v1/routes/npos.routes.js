const express = require("express");
const controllers = require("../controllers/npos.controller.js");
const router = express.Router();
const upload = require('../middleware/uploadMiddleware.js')
// const validation = require("../validations/admin.validation.js");
const authValidation = require("../validations/auth.validation.js");
const service = require("../services/npos.service.js");
const statusCode = require("../constants/statusCodes.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const { sendResponse } = require("../utils/sendResponse.js");
const fs = require('fs');
const path = require('path');


router.post('/page/:id', authValidation.id, controllers.addPage);
router.post('/page-details/:id', authValidation.id, controllers.getPage);
router.post('/shopify/page-details/:id', controllers.getPageShopify);
router.post('/upload/:id', authValidation.id, authValidation.npoImageType, (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (req.file == undefined) {
                const dir = path.join(__dirname, `../utils/images/${req.params.id}`);;
                const fileName = await service.findImageName(dir, req.query.type);
                if (fileName) {
                    fs.unlinkSync(path.join(dir, fileName));
                }
                return sendResponse(res, statusCode.OK, true, `File ${SuccessMessage.UPLOADED}`);
            } else {
                return sendResponse(res, statusCode.OK, true, `File ${SuccessMessage.UPLOADED}`);
            }
        }
    });
});
router.get('/image/:id', authValidation.id, authValidation.npoImageType, controllers.getPageImage);
router.get('/shopify/image/:id', authValidation.id, authValidation.npoImageType, controllers.getShopifyPageImage);
router.post('/webhook/order-complete', controllers.orderCompleteWebhook);
router.post('/records/:id', controllers.records);
router.post('/valid', controllers.validNpos);


module.exports = router;
