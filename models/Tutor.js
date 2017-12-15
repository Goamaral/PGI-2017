'use strict';

var Schema = require('mongoose').Schema;

var TutorSchema = new Schema({
  rating: Number,
  topics: [{
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Tutor', TutorSchema);
