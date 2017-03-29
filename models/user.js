var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var schema = new Schema({
  dateCreat:{type:Date, default: Date.now},
  name: {type: String, required: true},
  email: {type: String, required: true},
  password:{type: String, required: true},
  valid: {type: Boolean, default: false},
  gender:{type: String, default: 'X'},
  bio:{type: String, default: ''},
  interest: [],
  images: [],
  position: {
    lat: {type: Number},
    lon: {type: Number}
  },
}, {collection: 'users'});

schema.methods.addInterest = function(interest) {
  interest.forEach((e) => {this.interest.push(e)});
};

schema.methods.getName = function() {
  return this.name;
};

schema.methods.setName = function(newName) {
  this.name = newName;
};

schema.methods.getBio = function() {
  return this.bio;
};

schema.methods.setBio = function(newBio) {
  this.bio = newBio;
};

schema.methods.addImage = function(image) {
	this.images.push(image);
};

schema.methods.addPosition = function(latitude, longitude) {
  this.position.lat = latitude;
	this.position.lon = longitude;
};

schema.methods.getMatche = function(){
  console.log(this.find({valid: true}));
};

schema.methods.encryptPassword = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
	console.log("criptage du mot de passe");
};

schema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
	console.log("copareson de mode passe");
};

schema.methods.validUserById = function(id) {
  return this.findById(id);
}

schema.methods.getUserById = function(id) {
  return this.findById(id);
}



module.exports = mongoose.model('users', schema);
