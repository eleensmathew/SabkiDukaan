const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "iiitm-gwalior",
  api_key: "755879114919117",
  api_secret: "EEg7l_-FagG6vT2AxVXMS4BIjUY",
});

module.exports = cloudinary;
