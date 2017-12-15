'use strict';

var Schema = require('mongoose').Schema;

var FieldSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Field', FieldSchema);
