var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var schema = new Schema({
  dateCreat:{type:Date, default: Date.now},
  name: {type: String, required: true,},
  email: {type: String, required: true},
  password:{type: String, required: true},
  valid: {type: Boolean, default: false},
  gender:{type: String, default: 'X'},
  bio:{type: String, default: ''},
  interest: [],
}, {collection: 'users'});

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

module.exports = mongoose.model('users', schema);
