const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const tradeController = require("../controller/trade.controller");

router.get("/get-all", authorization, tradeController.getAll);
router.get(
  "/get-all-by-client/:id",
  authorization,
  tradeController.getAllByClient
);
router.post("/create", authorization, tradeController.create);
router.post("/update/:id", authorization, tradeController.update);

module.exports = router;
