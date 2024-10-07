const express = require('express')
const app = express()
const port = 3000
const Routes = require('./routes/index')

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api", Routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})