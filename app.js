const db = require('./db/models');
const express = require('express');
const routes = require('./src/routes/v1');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(routes);

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

async function runServer() {
  let retries = 5;
  while (retries) {
    try {
      await db.sequelize.authenticate();
      console.log('Database connection established successfully.');
      app.listen(PORT, HOST, function() {
        console.log(`Server running at http://${HOST}:${PORT}/`);
      });
      break;
    } catch(err) {
      console.error('Unable to connect to the database:', err);
      retries -= 1;
      console.log('Connection retries left: ', retries);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}

runServer();



