const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const tradeController = require("../controller/trade.controller");

router.get("/get-all", authorization, tradeController.getAll);
router.post("/create", authorization, tradeController.create);

module.exports = router;
