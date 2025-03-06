const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const adminAuth = require("../middleware/adminAuth");

router.get(
  "/login",
  adminAuth.redirectIfAuthaticated,
  adminController.loadLogin
);
router.post("/login", adminAuth.redirectIfAuthaticated, adminController.login);
router.get("/dashboard", adminAuth.checkSession, adminController.loadDashBoard);
router.post("/edit-user", adminAuth.checkSession, adminController.editUser);
router.get("/logout", adminAuth.checkSession, adminController.logout);
router.get(
  "/delete-user/:id",
  adminAuth.checkSession,
  adminController.deleteUser
);
router.post("/create-user", adminAuth.checkSession, adminController.addUser);
router.get("*", adminController.notFound);

module.exports = router;
