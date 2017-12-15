'use strict';

var bcrypt = require('bcrypt');
//var session = require('express-session');
var User = require('../models/User');
var saltRounds = parseInt(require('../config.json').saltRounds);

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.locals.csrf = req.csrfToken();
    res.render('home');
  });

  router.post('/login', function (req) {
    console.log(req.body);
  });

  router.post('/register', function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if (err != undefined) {
        console.log('error');
        throw err.message;
      } else {
        req.body.password = hash;
        User.create(req.body, function (err) {
          if(err) {
            res.send(false);
          } else res.send(true);
        });
      }
    });
  });
};
