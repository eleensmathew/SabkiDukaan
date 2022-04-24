const express = require("express");
const router = express.Router();
const SellerAuthController = require("../controllers/SellerAuthControllers");

router.post("/seller/register", SellerAuthController.register);
router.post("/seller/login", SellerAuthController.login);

module.exports = router;
