const express = require("express");
const router = express.Router();
const auth = require("../../src/middlewares/auth");
const activityLogController = require("../../src/controllers/activityLog.controller.js");

router.get("/", auth(), activityLogController.list);

module.exports = router;
