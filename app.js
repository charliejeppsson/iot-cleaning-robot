var express = require('express');
require('dotenv').config();

var app = express();

app.post('/tibber-developer-test/enter-path', function(req, res) {
  console.log('Post endpoint hit!');
});

var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 5000;

app.listen(PORT, HOST, function() {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
