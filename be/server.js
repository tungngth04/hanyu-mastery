require('dotenv').config();

const express = require('express');
const database = require('./config/database');
const apiRoute = require('./routes/index.route');
const { prefixPath } = require('./constants/index');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

database.connect();

const app = express();
const port = process.env.PORT || 3002;

// parse json body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(prefixPath, apiRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
