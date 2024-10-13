const express = require('express')
const cors = require("cors");
const http = require("http");
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const topicRoutes = require("./routes/topicRoutes.js");
// const questionRoutes = require("./routes/questionRoutes.js");
// const answerRoutes = require("./routes/answerRoutes.js");
const userAuthRoutes = require('./routes/userAuthRoutes')
const adminCmsRoutes = require('./routes/adminCmsRoutes')
const adminRoutes = require('./routes/adminroutes.js')

const { Server } = require("socket.io");
require("dotenv").config();

const app = express()

let corsOptions = {
  origin: "http://localhost:3000",  // Or use process.env.CLIENT_URL if you want to move to .env
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layout');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/auth", userAuthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/cms", adminCmsRoutes);
// app.use("/discussion", topicRoutes);
// app.use("/discussion", questionRoutes);
// app.use("/discussion", answerRoutes);

// // Use the routes
// app.use("/topic", topicRoutes);
// app.use("/question", questionRoutes);  // Use question routes
// app.use("/answer", answerRoutes);      // Use answer routes

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

module.exports = app, server
