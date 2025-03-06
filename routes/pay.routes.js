const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const payController = require("../controller/pay.controller");

router.post("/create", authorization, payController.create);

module.exports = router;
