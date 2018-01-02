'use strict';

var mongoose = require('mongoose');
var { Schema } = mongoose;

var TutorSchema = new Schema({
  rating: {
    type: Number,
    default: 0
  },
  topicIDs: [{
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  }],
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Tutor', TutorSchema);
