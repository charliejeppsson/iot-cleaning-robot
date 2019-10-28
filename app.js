const express = require('express');
const routes = require('./src/routes/v1');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(routes);

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

app.listen(PORT, HOST, function() {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
