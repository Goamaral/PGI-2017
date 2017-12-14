'use strict';

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var IndexSchema = new Schema({
    a_string: String,
    a_date: Date
});

module.exports = mongoose.model('IndexModel', IndexSchema);
