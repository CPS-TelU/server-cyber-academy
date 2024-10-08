const express = require('express')
const app = express()
const Routes = require('./routes/userAuthRoutes')

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api", Routes);

module.exports = app