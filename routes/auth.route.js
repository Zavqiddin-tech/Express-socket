const express = require("express");
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/company/register", authController.companyRegister);
router.post("/user/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.get("/checkuser", authMiddleware, authController.checkUser);
router.get("/check-admin", authMiddleware, authController.checkAdmin);
router.get("/get-all", authMiddleware, authController.getAll);
router.put("/change-status", authMiddleware, authController.changeStatus);
router.delete("/delete/:id", authMiddleware, authController.deleteUser);

module.exports = router;
