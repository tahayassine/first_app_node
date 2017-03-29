var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Messages = require('../models/messages');
var Likes = require('../models/likes');

router.get('/', function(req, res, next) {
  var user = new User();
  user.name = "tahalama";
  user.save();
  console.log("INSTALLATION>>> ", user);
  res.redirect('/');
});

module.exports = router;
