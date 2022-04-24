const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  aadhar: {
    type: Number,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});
sellerSchema.pre("save", async function (next) {
  const saltGen = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltGen);
  next();
});
const Seller = mongoose.model("Seller", sellerSchema);

module.exports = { Seller };
