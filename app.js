const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./controller/errorController');
const userRouter = require('./routes/userRouter');
const racketRouter = require('./routes/racketRouter');
const reviewRouter = require('./routes/reviewRouter');
const viewRouter = require('./routes/viewRouter');
const brandRouter = require('./controller/brandRouter');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

// app.set('view engine', 'pug');
// app.set('views', `${__dirname}/views`);

app.use('/', viewRouter);
app.use('/user', userRouter);
app.use('/racket', racketRouter);
app.use('/review', reviewRouter);
app.user('/brand', brandRouter);

// default middleware handler
// app.use(function(err, req, res, next))
app.use(errorHandler.globalErrorHandler);

module.exports = app;
