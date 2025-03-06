const express = require("express");
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/user/register", authController.register);
router.post("/login", authController.login);
router.get("/checkuser", authMiddleware, authController.checkUser);
router.get("/check-admin", authMiddleware, authController.checkAdmin);
router.get("/get-all", authMiddleware, authController.getAll);
router.put("/change-status", authMiddleware, authController.changeStatus);
// router.post("/logout", authController.logout);
// router.get("/refresh", authController.refresh);
// router.delete("/delete/:id", authMiddleware, authController.deleteUser);

module.exports = router;
