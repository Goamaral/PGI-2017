'use strict';

var mongoose = require('mongoose');
var { Schema } = mongoose;

var TopicSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  field: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Topic', TopicSchema);
