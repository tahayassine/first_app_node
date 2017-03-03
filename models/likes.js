var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  dateCreat:{type:Date, default: Date.now},
  idUser: {type: String, required: true,},
  idUserLike: {type: String, required: true},
}, {collection: 'likes'});

module.exports = mongoose.model('likes', schema);
