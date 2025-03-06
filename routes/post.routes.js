const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller");
const authorization = require("../middleware/auth.middleware");

router.get("/get-all", authorization, postController.getAll);
router.post("/create", authorization, postController.create);

module.exports = router;
