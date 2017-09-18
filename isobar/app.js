const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const lessMiddleware = require('less-middleware');
const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);
const config = require('config');
const helmet = require('helmet');

var index = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// App Default Configs
const icc = config.get('icc');
icc.date = new Date();
icc.currentyear = icc.date.getFullYear();
app.locals.icc = icc;

// Partials location and monitor so I dont have to restart Node everytime I add one
// expose locals for templating
hbs.localsAsTemplateData(app);
hbsutils.registerPartials(path.join(__dirname, 'views/partials'));
hbsutils.registerWatchedPartials(path.join(__dirname, 'views/partials'));

// Protect the app
app.use(helmet());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'isobar_frontend_codetest/images')));
app.use('/data', express.static(path.join(__dirname, 'isobar_frontend_codetest/data/data.json')));


app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
