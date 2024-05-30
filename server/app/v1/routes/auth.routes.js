const express = require("express");
const controllers = require("../controllers/auth.controller.js");
const router = express.Router();
const validation = require("../validations/auth.validation.js");

router.post('/login', validation.login, controllers.login);
router.post('/register', validation.register, controllers.register);
router.post('/reset-password', validation.resetPassword, controllers.resetPassword);
router.post('/forgot-password/:id', validation.forgotPassword, controllers.forgotPassword);

module.exports = router;
