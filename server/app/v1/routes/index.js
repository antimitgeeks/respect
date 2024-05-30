const express = require("express");
const authRoutes = require("./auth.routes.js");
const storeRoutes = require("./store.routes.js");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/store", storeRoutes);

module.exports = router;
