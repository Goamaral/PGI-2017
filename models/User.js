'use strict';

var Schema = require('mongoose').Schema;

var UserSchema = new Schema({
  name: String,
  phone: Number,
  course: String,
  year: Number,
  email: String,
  password: String,
  tutor: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor'
  }
});

module.exports = mongoose.model('User', UserSchema);
