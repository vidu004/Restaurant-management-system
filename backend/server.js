require("dotenv").config();
const http = require("http");
const express = require("express");
const app = require("./index");

const server = http.createServer(app);
server.listen(process.env.PORT);

// server.js or app.js
app.use(express.static('public'));

