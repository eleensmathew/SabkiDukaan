const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const connectToDb = require("./config/db");
const fileUpload = require("express-fileupload");

app.use("/public", express.static("public"));
app.use(express.json());
app.use(cookieParser());
// using middlewares
app.use(
  cors({
    origin: [/netlify\.app$/, /localhost:\d{4}$/],
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// routes

//home

app.use("/api", require("./routes/SellerRoutes"));
app.use("/api", require("./routes/UserRoutes"));
app.use("/api/product", require("./routes/ProductRoutes"));
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API service running 🚀",
  });
});

connectToDb();
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
