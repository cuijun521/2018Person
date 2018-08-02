var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./api/index')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(session({
  resave: true, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'love'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const oauthArr = ['/api/user/info']

//设置跨域访问  
app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");  //允许跨域访问的网站 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");   //允许的headers字段
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");   //允许的请求方法
  res.header("Access-Control-Allow-Credentials", true); //允许携带cookie
  res.header("Content-Type", "application/json;charset=utf-8");   //接收到的内容格式
  if (oauthArr.indexOf(req.path) != -1) {
    if (req.cookies.token) {
      next();
    } else {
      res.status(401).json({
        code: 401,
        msg: '用户未登录'
      })
    }
  } else {
    next()
  }
});  

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

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
