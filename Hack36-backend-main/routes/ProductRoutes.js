const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/authMiddleWare");
const SellerAuth = require("../middleware/sellerAuthMiddleWare");
const ProductController = require("../controllers/ProductController");
const cloudinary = require("../config/cloudinaryConfig");
const upload = require("../middleware/UploadMiddleWare");
router.post("/createProduct", SellerAuth, ProductController.createProduct);
router.get("/getAllProducts", ProductController.getAllProducts);
router.get("/getProduct/:id", ProductController.getProduct);
router.post("/addReview/:id", requireAuth, ProductController.addReview);
router.delete("/deletereview/:index", ProductController.deleteReview);
router.get(
  "/getProductByCategory/:category",
  ProductController.getproductBycategory
);
router.get("/getProductBySeller/:id", ProductController.getProductBySellerID);
router.get(
  "/getProductListBySeller",
  SellerAuth,
  ProductController.getProductListBySeller
);
module.exports = router;
