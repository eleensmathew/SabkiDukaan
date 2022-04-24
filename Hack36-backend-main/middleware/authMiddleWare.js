// auth middleware
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");

const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies.jwt; 
    if (token) {
      jwt.verify(token, "SECRET_KEY", async (err, decodedToken) => {
        if (err) {
          throw new Error("Authentication failed");
        }
        // get user by id
        console.log(decodedToken.id);
        const AuthenticatedUser = await User.findById(decodedToken.id);
        console.log(AuthenticatedUser);
        if (!(AuthenticatedUser&&AuthenticatedUser._id)) {
          throw new Error("Authentication failed");
        }
        req.user = AuthenticatedUser;
        next();
      });
    } else {
      throw new Error("Authentication failed");
    }
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
};

module.exports = requireAuth;
