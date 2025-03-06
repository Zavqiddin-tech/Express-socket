const express = require("express");
const router = express.Router();
const clientController = require("../controller/client.controller");
const authorization = require("../middleware/auth.middleware");

router.get("/get-all", authorization, clientController.getAll);
router.post("/create", authorization, clientController.create);

module.exports = router;
