const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
  res.render('404.pug');
  next();
});
app.get('/racket');

module.exports = app;
