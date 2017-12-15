'use strict';

var mongoose = require('mongoose');
var { Schema } = mongoose;

var TopicSchema = new Schema({
  name: String,
  field: {
    type: Schema.Types.ObjectId,
    ref: 'Field'
  }
});

module.exports = mongoose.model('Topic', TopicSchema);
