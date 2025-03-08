const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const payController = require("../controller/pay.controller");

router.post("/create", authorization, payController.create);
router.put("/update/:id", authorization, payController.update);
router.delete("/delete/:id", authorization, payController.deletePay);

module.exports = router;
