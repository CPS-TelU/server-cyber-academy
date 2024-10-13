const express = require("express");
const cors = require("cors");
const http = require("http");
const topicRoutes = require("./routes/topicRoutes.js");
const questionRoutes = require("./routes/questionRoutes.js");
const answerRoutes = require("./routes/answerRoutes.js");
const moduleRoutes = require("./routes/moduleRoutes.js");
const certificateRoutes = require("./routes/certificateRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();

// CORS options
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Use the routes
app.use("/api/topics", topicRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/tasks", taskRoutes);

// Server setup
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

// Exporting app and server for testing
module.exports = { app, server };
