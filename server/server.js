const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
// console.log(publicPath);

// Adding things to deploy in heroku
const port = process.env.PORT || 3000;

var app = express();
// Setting up the Middleware
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started app on port ${port}`);
});
