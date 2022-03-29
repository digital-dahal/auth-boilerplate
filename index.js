const express = require("express")();
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("./router");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

express.use(morgan("combined"));
express.use(bodyParser.json({ type: "*/*" }));
router(express);

const server = http.createServer(express);
const port = process.env.PORT || 4070;
server.listen(port, () => {
  console.log("Server listening on :", port);
});
