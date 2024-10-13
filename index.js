const express = require('express');
const dotenv = require('dotenv'); // Import dotenv separately for clarity
const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables from .env file
dotenv.config();   

app.use(express.json());

// Basic route handler
app.get('/', (req, res) => {
  res.send('API for CPS LMS');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack trace
  res.status(500).send('Something broke!'); // Send generic error response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
