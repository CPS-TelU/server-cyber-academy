
const { app, server } = require("./app.js");
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
