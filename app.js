
const express = require("express");
const cors = require("cors");
const http = require("http");
const topicRoutes = require("./routes/topicRoutes.js");
const questionRoutes = require("./routes/questionRoutes.js");
const answerRoutes = require("./routes/answerRoutes.js");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();

// CORS options
let corsOptions = {
  origin: "http://localhost:3000",  // Or use process.env.CLIENT_URL if you want to move to .env
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
//routes
app.use("/discussion", topicRoutes);
app.use("/discussion", questionRoutes);
app.use("/discussion", answerRoutes);

// Use the routes
app.use("/topic", topicRoutes);
app.use("/question", questionRoutes);  // Use question routes
app.use("/answer", answerRoutes);      // Use answer routes

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
    io.emit("questionBroadcast", questionData);  // Broadcast question to all clients
  });

  // Listening for new answer events
  socket.on("newAnswer", (answerData) => {
    io.emit("answerBroadcast", answerData);  // Broadcast answer to all clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Exporting app and server
module.exports = { app, server };
