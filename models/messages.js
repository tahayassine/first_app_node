var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  dateCreat:{type:Date, default: Date.now},
  idUser: {type: String, required: true,},
  idToUser: {type: String, required: true},
  message: {type: String, required: true},
}, {collection: 'messages'});

module.exports = mongoose.model('messages', schema);