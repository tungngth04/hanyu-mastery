require('dotenv').config();

const express = require('express');
const database = require('./config/database');
const apiRoute = require('./routes/index.route');
const { prefixPath } = require('./constants/index');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const http = require('http');
const { initSocket } = require('./config/socket');

database.connect();

const cors = require('cors');
const app = express();
const port = process.env.PORT || 3002;
// tạo server từ express
const server = http.createServer(app);

app.use(cors());
// parse json body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(prefixPath, apiRoute);

initSocket(server);

const sendReminder = require('./helpers/sendReminder');

if (process.env.NODE_ENV === 'development') {
  const cron = require('node-cron');
  cron.schedule('54 10 * * *', sendReminder);
  console.log('Node-cron schedule active (development)');
}

app.post('/cron/reminder', async (req, res) => {
  try {
    await sendReminder();
    res.send('OK');
  } catch (err) {
    console.error('Error running cron job:', err);
    res.status(500).send('Error running cron job');
  }
});

app.use((err, req, res) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    code: statusCode,
    message: err.message || 'Internal Server Error',
  });
});

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
