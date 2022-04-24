const { Seller } = require("../models/seller");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const createToken = (id) => {
  return jwt.sign({ id }, "SECRET_KEY", {
    expiresIn: 60 * 60 * 24 * 3,
  });
};

exports.register = async (req, res) => {
  const { name, email,storeName, password, aadhar, address } = req.body;
  try {
    const seller = await Seller.create({
      name,
      email,
      password,
      aadhar,
      address,
      storeName 
    });
    const token = createToken(seller._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3 * 1000,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ seller, token: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email });
    if (seller) {
      const auth = await bcrypt.compare(password, seller.password);
      if (auth) {
        const token = createToken(seller._id);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 3 * 1000,
          sameSite: "none",
          secure: true,
        });
        res.status(200).json({ seller, token: token });
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
    const USER = await Seller.findOneAndUpdate(
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
