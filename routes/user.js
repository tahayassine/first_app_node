var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
var User = require('../models/user');



/* GET users listing. */

router.get('/profile',isLoggedIn, function(req, res, next){
  var usersId = req._passport.session.user;
  if (usersId == req.user._id)
  {
      User.findById(usersId, function (err, user) {
      if (err) { throw err; }
      console.log('User Is',user);
      user.interest.push('test', 'erray', 'whorck');
      res.render('profil',user);
   });
  }
});

router.get('/parameter', isLoggedIn, function(req, res, next){
  User.findById(req._passport.session.user, function (err, user) {
    if (err) { throw err; }
    res.render('parameter', user);
  });
});

router.get('/swap', isLoggedIn, function(req, res, next){
  res.render('swap',{});
});

router.get('/tchats', isLoggedIn, function(req, res, next){
  res.render('tchats',{});
});

router.get('/tchatwith/:id', isLoggedIn, function(req, res, next){
  res.render('tchat-with',{});
});

router.use('/', notLoggedIn, function(req, res, next){
  next();
})

router.get('/signup',notLoggedIn, function(req, res, next) {
    var messages = req.flash('error');
    console.log('messages:' , messages);
    res.render('signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/signin', function(req, res, next){
  var messages = req.flash('error');
    console.log('messages:' , messages);
    res.render('signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));


router.get('/signout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // res.io.sockets.on('connection', function(socket){
    //     socket.emit('message', 'Vous êtes bien connecté !');
    // });
    return next();
  }
  res.redirect('/')
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/profile')
}

module.exports = router;
