const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const postController = require("../controller/post.controller");

router.get("/get-all", authorization, postController.getAll);
router.post("/create", authorization, postController.create);

module.exports = router;
