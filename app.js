const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./controller/errorController');
const userRouter = require('./routes/userRouter');
const racketRouter = require('./routes/racketRouter');
const reviewRouter = require('./routes/reviewRouter');
const viewRouter = require('./routes/viewRouter');

const app = express();
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

// app.use('/', viewRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/racket', racketRouter);
app.use('/api/v1/review', reviewRouter);

// default middleware handler
// app.use(function(err, req, res, next))
app.use(errorHandler.globalErrorHandler);

module.exports = app;
