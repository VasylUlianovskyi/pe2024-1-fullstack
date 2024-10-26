const express = require('express');
const cors = require('cors');
const { errorHandlers } = require('./middleware');
const router = require('./routes');
const { STATIC_PATH } = require('./constants');

const app = express();

const corsOptions = { origin: '*' };

app.use(cors(corsOptions));

app.use(express.json());

// http://localhost:5000/images/filename
app.use(express.static(STATIC_PATH));

app.use('/api', router);

app.use(
  errorHandlers.multerErrorHandler,
  errorHandlers.dbErrorHandler,
  errorHandlers.errorHandler
);

module.exports = app;

// таски конкретного користувача
// GET /api/users/:userId/tasks

// отримати перелік тасок, щоб біля кожної було вказано юзера
// GET /api/tasks
