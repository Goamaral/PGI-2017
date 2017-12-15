'use strict';

var Schema = require('mongoose').Schema;

var TopicSchema = new Schema({
  name: String,
  field: {
    type: Schema.Types.ObjectId,
    ref: 'Field'
  }
});

module.exports = mongoose.model('Topic', TopicSchema);
