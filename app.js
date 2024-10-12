const express = require("express");
const cors = require("cors");
const http = require("http");
const topicRoutes = require("./routes/topicRoutes.js");
const questionRoutes = require("./routes/questionRoutes.js");
const answerRoutes = require("./routes/answerRoutes.js");
const { Server } = require("socket.io");
require("dotenv").config();
const app = express();
let corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
//routes
app.use("/discussion", topicRoutes);
app.use("/discussion", questionRoutes);
app.use("/discussion", answerRoutes);

//server
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("newMessage", (message) => {
    io.emit("messageBroadcast", message);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

module.exports = { app, server };
