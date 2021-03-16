// main starting file for the app
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./router");
const mongoose = require("mongoose");

// DB Setup to connect to a local mongo DB instance with database name auth
mongoose.connect("mongodb://localhost:27017/auth");

const app = express();
// App Setup
app.use(morgan("combined")); // this is to debug our app
app.use(bodyParser.json({ type: "*/*" })); // to parse our incoming request
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log("server listening on : ", port);
