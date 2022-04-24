const { Product } = require("../models/product");
const cloudinary = require("../config/cloudinaryConfig");
const { Seller } = require("../models/seller");

exports.createProduct = async (req, res) => {
  try {
    const sellerID = req.user._id;
    const {
      productname,
      productprice,
      productdescription,
      productcategory,
      quantity,
      Stock,
      discount,
      weight,
    } = req.body;
    //get images files

    let productImages = req.files.productImages || [];
    for (let i = 0; i < productImages?.length; i++) {
      console.log(productImages[i]);
      let { public_id, url } = await cloudinary.uploader.upload(
        productImages[i].tempFilePath
      );
      console.log(url);
      productImages[i] = { public_id, url };
    }
    const product = await Product.create({
      productname,
      productprice: Number(productprice),
      productImages,
      productdescription,
      productcategory,
      discount: Number(discount),
      weight: Number(weight),
      seller: sellerID,
      quantity: Number(quantity),
      Stock: Boolean(Stock),
      reviews: [],
    });
    const seller = await Seller.findById(sellerID);
    // console.log(seller);
    seller.products.push(product._id);
    await seller.save();

    res.status(200).json({
      status: 200,
      data: product,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 400,
      message: err,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().populate("seller");
  res.status(200).json({
    status: 200,
    data: products,
  });
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("seller");
  res.status(200).json({
    status: 200,
    data: product,
  });
};

exports.addReview = async (req, res) => {
  const {  rating, comment,createdAt } = req.body;
  const {name}=req.user
  const product = await Product.findById(req.params.id);
  product.reviews.push({ name,createdAt, rating: Number(rating), comment });
  product.numberOfReviews = product.reviews.length;
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  avg = avg / product.reviews.length;
  product.rating = avg;
  await product.save();
  res.status(200).json({
    status: 200,
    data: product,
  });
};

exports.getAllreviews = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    status: 200,
    data: product.reviews,
  });
};

exports.deleteReview = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.reviews.splice(req.params.index, 1);
  product.numberOfReviews = product.reviews.length;
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  avg = avg / product.reviews.length;
  product.rating = avg;
  await product.save();
  res.status(200).json({
    status: 200,
    data: product,
  });
};

exports.getproductBycategory = async (req, res) => {
  //search for products by category in category array
  const products = await Product.find({
    productcategory: req.params.category,
  })
    .limit(3)
    .populate("seller");
  res.status(200).json({
    status: 200,
    data: products,
  });
};

exports.getProductBySellerID = async (req, res) => {
  const products = await Product.find({
    seller: req.params.id,
  }).limit(6);
  res.status(200).json({
    status: 200,
    data: products,
  });
};
exports.getProductListBySeller = async (req, res) => {
  const products = await Product.find({
    seller: req.user._id,
  })
  res.status(200).json({
    status: 200,
    data: products,
  });
};
