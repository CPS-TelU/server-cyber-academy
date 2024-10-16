const { app, server } = require("./app.js");
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});