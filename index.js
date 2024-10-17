const { app, server } = require("./app.js");
const PORT = process.env.PORT || 3000;
app.listen(PORT, server, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
