// app.js
const express = require('express');
const app = express();
const port = 3000;

// Import file routes
const fileRoutes = require('./routes/adminroutes');

// Middleware
app.use('/api', fileRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
