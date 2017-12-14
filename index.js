'use strict';

var express = require('express');
var kraken = require('kraken-js');
var path = require('path');
var enrouten = require('express-enrouten');
var mongoose = require('mongoose');
var config = require('./config.json');
var mongoUrl = "mongodb://" + config.username + ":" + config.password + "@ds141766.mlab.com:41766/uteach";

var options, app, db;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        next(null, config);
    }
};

app = module.exports = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// database
mongoose.connect(mongoUrl, { useMongoClient: true });
mongoose.Promise = global.Promise;
db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// dynamic routing
app.use(enrouten({}));

app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

process.on('exit', function() {
  db.close();
});
