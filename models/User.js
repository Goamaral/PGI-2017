'use strict';

var mongoose = require('mongoose');
var { Schema } = mongoose;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: Number,
    required: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  rank: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    require: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tutorID: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: false
  }
});

module.exports = mongoose.model('User', UserSchema);
