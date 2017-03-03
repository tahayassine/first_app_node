var User = require('../models/user');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/matcha');
var users = [
  new User({
    name: "admin",
    password: "admin",
    email: "admin@hotmail.com",
    gender:"M",
    bio:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    interest: [
      "patate",
      "foot",
      "igiene"
    ]
}),
new User({
  name: "taha",
  password: "taha",
  email: "taha@hotmail.com",
  gender:"M",
  bio:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  interest: [
    "photo",
    "lorem",
    "testicule"
  ]
})
];

var tmp = 0;
for (var i = 0; i < users.length; i++) {
  users[i].save(function(err, result){
    tmp++;
    if( tmp === users.length)
      exit();
  });
}
function exit(){
  mongoose.disconnect();
}
