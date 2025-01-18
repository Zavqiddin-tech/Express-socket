const express = require("express");
const postController = require("../controller/post.controller");
const router = express.Router();

router.get("/get-all", postController.getAll);
router.post("/create", postController.create);


module.exports = router;