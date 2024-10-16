const express = require("express");
const cors = require("cors");
const http = require("http");
const topicRoutes = require("./routes/topicRoutes.js");
const questionRoutes = require("./routes/questionRoutes.js");
const answerRoutes = require("./routes/answerRoutes.js");
const adminRoutes = require("./routes/admin/adminroutes.js");
const { Server } = require("socket.io");
const app = express();

require("dotenv").config();
let corsOptions = {
  origin: ["http://localhost:3000", "https://www.cpslaboratory.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

//routes
app.use("/discussion", topicRoutes);
app.use("/discussion", questionRoutes);
app.use("/discussion", answerRoutes);
app.use('/api', adminRoutes)
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