var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars')
var expressValidator = require('express-validator')
var expressSession = require('express-session');
var csrf = require('csurf');
var passport = require('passport');
var flash = require('connect-flash');

var csrfProtect = csrf();

var index = require('./routes/index');
var user = require('./routes/user');
var install = require('./routes/install');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/matcha');

require('./config/passport');

// view engine setup
app.engine('hbs',
  hbs({extname: 'hbs',
      defaultLayout: 'layout',
      layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:'max', saveUninitialized: false, resave: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(csrfProtect);

app.use(function(req, res, next){
  res.locals.isConnect = req.isAuthenticated();
  next();
})

var User = require('./models/user');
var Messages = require('./models/messages');
var Likes = require('./models/likes');
 // require('./config/io.js');
 
//instalation de la base de donne:
// require('./install');

io.sockets.on('connection', (socket)=>{
  console.log("nouveu etulisateur");
  socket.on('likeUser', (data) => {
    console.log("toi," + data.user + "tu vien de like:" + data.like);
    socket.emit('message' , "je vous envoie nouveau match!");
  });
  socket.on('newPosition', (postion) =>{
    console.log("postion:\nlongitude: " +postion.lon+ "\nlatitude: "+ postion.lat);
  })
});

app.use('/user', user);
app.use('/install', install);
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

server.listen(process.env.PORT || 3000, () => {
  console.log(`server started on port ${process.env.PORT || 3000}`);
})
