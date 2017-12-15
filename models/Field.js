'use strict';

var mongoose = require('mongoose');
var { Schema } = mongoose;

var FieldSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Field', FieldSchema);
