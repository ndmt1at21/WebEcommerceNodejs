const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./controller/errorController');
const userRouter = require('./routes/userRouter');
const racketRouter = require('./routes/racketRouter');
const reviewRouter = require('./routes/reviewRouter');
const viewRouter = require('./routes/viewRouter');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// just for local test
// it can remove error cors (http)
const corsOptions = {
  origin: 'http://127.0.0.1:8000',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization'],
  exposedHeaders: ['X-Paging-Current', 'X-Paging-Count'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

// FOR VIEW (SERVER RENDER) (uncomment for test render)
app.use('/', viewRouter);

// FOR API (CLIENT RENDER) (uncomment for test api)
app.use('/api/v1/user', userRouter);
app.use('/api/v1/racket', racketRouter);
app.use('/api/v1/review', reviewRouter);

// default middleware handler
// app.use(function(err, req, res, next))
app.use(errorHandler.globalErrorHandler);

module.exports = app;
