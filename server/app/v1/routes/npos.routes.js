const express = require("express");
const controllers = require("../controllers/npos.controller.js");
const router = express.Router();

// const validation = require("../validations/admin.validation.js");
// const authValidation = require("../validations/auth.validation.js");

router.post('/page/add/:id', controllers.addPage);

module.exports = router;
