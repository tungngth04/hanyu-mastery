require('dotenv').config();

const express = require('express');
const database = require('./config/database');

// database.connect();

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
