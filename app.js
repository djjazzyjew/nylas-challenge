var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var emailRouter = require('./routes/email');
var oauthRouter = require('./routes/oauth');
var messageRouter = require('./routes/message');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var nylasAppConfigs = {
  clientId: '<YOUR_CLIENT_ID>',
  clientSecret: '<YOUR_CLIENT_SECRET>'
};

// setup the Nylas API
global.Nylas = require('nylas').config(nylasAppConfigs);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// set up session management
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session(
    Object.assign(
      {
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        secret: '<YOUR_SESSION_SECRET>'
      },
    )
  )
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/email', emailRouter);
app.use('/oauth', oauthRouter);
app.use('/message', messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
