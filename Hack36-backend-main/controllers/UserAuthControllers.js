const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinaryConfig");

// create token
const createToken = (id) => {
  return jwt.sign({ id }, "SECRET_KEY", {
    expiresIn: 60 * 60 * 24 * 3,
  });
};

exports.register = async (req, res) => {
  const { name, email, password, address } = req.body;
  try {
    const user = await User.create({ name: name, email, password, address });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3 * 1000,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ user, token: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 3 * 1000,
          sameSite: "none",
          secure: true,
        });
        res.status(200).json({ user, token: token });
      } else throw Error("Authentication failed");
    } else throw Error("Authentication failed");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.UploadImage = async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host");

    const result = await cloudinary.uploader.upload(req.file.path);
    const USER = await User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $set: {
          profileImg: result.secure_url,
        },
      },
      { new: true, returnDocument: true }
    );
    res.status(200).json({ user: USER });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.AddtoCart = async (req, res) => {
  const { product:productId, quantity } = req.body;
  // add or update product in cart array
  try {
    let user = await User.findById(req.user._id);
    let flag = 0;
    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].product?.toString() === productId) {
        user.cart[i].quantity = quantity;
        flag = 1;
      }
    }
    if (flag === 0) {
      user.cart.push({
        product: productId,
        quantity: quantity,
      });
    }
    await user.save();
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.RemovefromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $pull: {
          cart: productId,
        },
      },
      { new: true, returnDocument: true }
    );
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.GetCart = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate("cart.product");
    res.status(200).json({cart: user.cart });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.Logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}