var User = require('./models/user');
var Messages = require('./models/messages');
var Likes = require('./models/likes');

for (var i = 0; i < 50; i++) {
  var user1 = new User({
    name: 'moi'+i,
    email: 'moi'+i+'@moi.fr',
    valid:true,
    gender: ((i % 2 == 0)?"M":"F"),
    bio:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"+
        "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"+
        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."+
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
    interest: ["test","un truck", "autre"],
    images: ["http://lorempixel.com/200/200/people",
            "http://lorempixel.com/200/200/people"],
    position: {
      lat: 2.3183435 + (0.001 * i),
      lon: 48.896682 + (0.001 * i)
    }
  })
  user1.password = user1.encryptPassword("moi")
  user1.save();
}
