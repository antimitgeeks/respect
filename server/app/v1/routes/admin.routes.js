const express = require("express");
const controllers = require("../controllers/admin.controller.js");
const router = express.Router();
const validation = require("../validations/admin.validation.js");
const authValidation = require("../validations/auth.validation.js");

router.post('/npo/create', validation.addNop, controllers.createNpo);
router.post('/npo/list', authValidation.list, controllers.npoList);
router.post('/npo/:id', authValidation.id, controllers.npoById);
router.put('/npo/:id', authValidation.id, validation.addNop, controllers.npoUpdate);
router.delete('/npo/:id', authValidation.id, controllers.npoDelete);

module.exports = router;
