const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const clientController = require("../controller/client.controller");

router.get("/get-all", authorization, clientController.getAll);
router.post("/create", authorization, clientController.create);

module.exports = router;
