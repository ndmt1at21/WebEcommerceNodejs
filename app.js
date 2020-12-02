const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./controller/errorController');
const viewRouter = require('./routes/viewRouter');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.get('/', viewRouter);

// default middleware handler
// app.use(function(err, req, res, next))
app.use(errorHandler.globalErrorHandler);

module.exports = app;
