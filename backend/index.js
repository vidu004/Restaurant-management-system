const express = require("express");
var cors = require("cors");
const connection = require("./connection");
const userRoute = require("./routes/user.js");
const categoryRoute = require("./routes/category.js");
const productRoute = require("./routes/product.js");
const billRoute = require("./routes/bill.js");
const dashRoute = require("./routes/dashboard.js");
const messageRoute = require("./routes/message.js");
const newsletterRoute = require("./routes/newsletter.js");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/bill", billRoute);
app.use("/dash", dashRoute);
app.use("/message", messageRoute);
app.use("/newsletter",newsletterRoute);
module.exports = app;

