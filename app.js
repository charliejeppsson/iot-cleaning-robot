var express = require('express');
require('dotenv').config();

var app = express();

app.get('/tibber-developer-test/enter-path', function(req, res) {
  console.log('Endpoint hit!');
  res.send('Hello world!');
});

var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 5000;

app.listen(PORT, HOST, function() {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
