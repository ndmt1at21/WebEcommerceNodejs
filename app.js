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

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use((req, res, next) => {
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/racket', racketRouter);
app.use('/api/v1/review', reviewRouter);

// default middleware handler
// app.use(function(err, req, res, next))
app.use(errorHandler.globalErrorHandler);

module.exports = app;
