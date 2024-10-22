const server = require("./app"); // Import server from app.js
const PORT = process.env.PORT || 3000; // Use environment variable for port, or default to 3000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
