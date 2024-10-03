const express = require('express');
const app = express();
require('dotenv').config();   
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Menangani rute dasar
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
