var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var User = require('../models/user');
var Messages = require('../models/messages');
var Likes = require('../models/likes');

io.sockets.on('connection', (socket)=>{
  console.log("nouveu etulisateur");
  socket.on('likeUser', (data) => {
    console.log("toi," + data.user + "tu vien de like:" + data.like);
    socket.emit('message' , "je vous envoie nouveau match!")
  });
});
