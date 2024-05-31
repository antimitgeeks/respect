const express = require("express");
const authRoutes = require("./auth.routes.js");
const storeRoutes = require("./store.routes.js");
const adminRoutes = require("./admin.routes.js");
const nposRoutes = require("../routes/npos.routes.js");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/store", storeRoutes);
router.use("/admin", adminRoutes);
router.use("/npos", nposRoutes);

module.exports = router;
