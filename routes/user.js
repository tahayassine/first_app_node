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
     console.log(req.user);
     console.log('passport de litulisateyr',req._passport.session.user);
     res.render('profil',{user:req.user});
  }
});

router.get('/parameter', isLoggedIn, function(req, res, next){

});

router.get('/swap', isLoggedIn, function(req, res, next){
  res.render('swap',{});
});

router.get('/tchats', isLoggedIn, function(req, res, next){
  res.render('tchats',{});
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
