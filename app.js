const express = require('express')
const app = express()
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const Routes = require('./routes/userAuthRoutes')
const adminRoutes = require('./routes/adminCmsRoutes')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layout');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api", Routes);
app.use("/cms", adminRoutes);

module.exports = app
