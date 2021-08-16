const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const { errorConverter, errorHandler } = require('./middleware/error');
const cron = require('node-cron');
const { mailNotification } = require('./services/monitorCron');

const app = express();

// in production we will handle the cron job properly with queue
cron.schedule('* * * * *', () => {
  console.log('running a cron task every minute');
  mailNotification();
});

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.status(404).json({ status: "NOT_FOUND" , data:null});
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
