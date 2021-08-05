var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  signature: { type: String },
  iv: { type: String },
  nickName: { type: String },
  gender: { type: String },
  city: { type: String },
  province: { type: String },
  avatarUrl: { type: String },
  token: { type: String },
  follows: { type: Array },
  praises: { type: Array },
  collects: { type: Array }
});
var User = mongoose.model('user', schema, 'user');

module.exports = User;
