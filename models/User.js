'use strict';

var Schema = require('mongoose').Schema;

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
  year: Number,
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  tutor: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: false
  }
});

module.exports = mongoose.model('User', UserSchema);
