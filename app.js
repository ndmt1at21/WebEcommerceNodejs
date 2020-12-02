const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./controller/errorController');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.get('/racket');

// default middleware handler
// app.use(function(err, req, res, next))
app.use(errorHandler.globalErrorHandler(err, req, res, next));

module.exports = app;
