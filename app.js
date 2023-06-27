// app.js

const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

// cookie parser
const cookieParser = require("cookie-parser");

const usersRouter = require("./routes/users.route.js");

// Middleware ==================================================
app.use(express.json()) // req.body parser
app.use(cookieParser()); // cookie parser
// Middleware ==================================================

// HTML, CSS
app.use(express.static(path.join(__dirname, 'assets')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

// localhost:3000/api/
app.use('/api', [usersRouter]);

app.listen(port, () => {
  console.log(port, '=> server open!');
});
