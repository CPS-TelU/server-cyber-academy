const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const Routes = require("./routes/adminroutes");
app.use("/api", Routes);

let corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());

module.exports = app;
