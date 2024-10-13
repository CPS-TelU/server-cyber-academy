const express = require("express");
const moduleRoutes = require("./routes/routes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Load environment variables from .env file
dotenv.config();   

app.use(express.json());

app.use("/api", moduleRoutes);
// Menangani rute dasar
app.get("/", (req, res) => {
  res.send("API for CPS LMS");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack trace
  res.status(500).send('Something broke!'); // Send generic error response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
