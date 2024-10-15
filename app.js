const express = require('express');
const cors = require("cors");
const http = require("http");
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const topicRoutes = require("./routes/topicRoutes.js");
// const questionRoutes = require("./routes/questionRoutes.js");
// const answerRoutes = require("./routes/answerRoutes.js");
const userAuthRoutes = require('./routes/userAuthRoutes');
const adminCmsRoutes = require('./routes/adminCmsRoutes');
const adminRoutes = require('./routes/adminroutes.js');

const modulRoutes = require('./routes/modulRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const groupRoutes = require('./routes/groupRoutes.js');
const submissionRoutes = require('./routes/submissionRoutes');

const { Server } = require("socket.io");
require("dotenv").config();

const app = express();

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

// Attach Socket.io to request object
const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions });

app.use((req, res, next) => {
  req.io = io;  // Attach io to the request object
  next();
});

app.get('/', (req, res) => {
  res.send('CPS API!');
});

app.use("/api/auth", userAuthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/cms", adminCmsRoutes);

// by Mitchel
app.use('/api/moduls', modulRoutes);
app.use('/api/certificate', certificateRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/submissions', submissionRoutes);

// Server setup for Socket.io
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

// Export app and server correctly
module.exports = app, server;
