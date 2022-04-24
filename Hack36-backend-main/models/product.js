const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
    },
    productprice: {
      type: Number,
      required: true,
    },
    productdescription: {
      type: String,
      required: true,
    },
    productcategory: [
      {
        type: String,
        required: true,
      },
    ],
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    productImages: [
      {
        public_id: String,
        url: String,
      },
    ],
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    Stock: {
      type: Boolean,
      default: true,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt:{
          type: Date,
        }
      },
    ],
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const orderhistorySchema = mongoose.Schema(
  {
    orders: {
      transactions: [
        {
          userid: {
            type: String,
            required: true,
          },
          sellerid: {
            type: String,
            required: true,
          },
          transactionid: {
            type: String,
            required: true,
          },
          time_of_order: {
            type: Date,
          },
          delivered: {
            type: Boolean,
            default: false,
          },
          received: {
            type: Boolean,
            default: false,
          },
          items: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        },
      ],
    },
  },
  { timestamps: true }
);
const Orderhistory = mongoose.model("Orderhistory", orderhistorySchema);
const Product = mongoose.model("Product", productSchema);
module.exports = { Product, Orderhistory };
