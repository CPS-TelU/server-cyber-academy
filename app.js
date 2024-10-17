const express = require("express");
const cors = require("cors");
const http = require("http");
const topicRoutes = require("./routes/topicRoutes.js");
const questionRoutes = require("./routes/questionRoutes.js");
const answerRoutes = require("./routes/answerRoutes.js");
const moduleRoutes = require("./routes/moduleRoutes.js");
const authRoutes = require("./routes/userAuthRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const { Server } = require("socket.io");
const app = express();
require("dotenv").config();
// CORS options
let corsOptions = {
  origin: ["http://localhost:3000", "https://www.cpslaboratory.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  origin: "http://localhost:3000", // Or use process.env.CLIENT_URL if you want to move to .env
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

//routes
app.use("/discussion", topicRoutes);
app.use("/discussion", questionRoutes);
app.use("/discussion", answerRoutes);
app.use("/api", moduleRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});
// Socket.io setup
io.on("connection", (socket) => {
  console.log("A user connected");
  // Listening for new question events
  socket.on("newQuestion", (questionData) => {
    io.emit("questionBroadcast", questionData); // Broadcast question to all clients
  });
  // Listening for new answer events
  socket.on("newAnswer", (answerData) => {
    io.emit("answerBroadcast", answerData); // Broadcast answer to all clients
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Exporting app and server
module.exports = { app, server };
