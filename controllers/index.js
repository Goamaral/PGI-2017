'use strict';

var sha256 = require('js-sha256').sha256;
var session = require('express-session');
var User = require('../models/User');

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.locals.csrf = req.csrfToken();
    res.render('home');
  });

  router.post('/login', function (req, res) {
     User.find({ email: req.body.email }, function (err, user) {
      if (err != undefined) {
        res.send({ sts: false, msg: err });
      } else {
        let hash = sha256(req.body.password);
        res.send({ sts: hash == user[0].password });
      }
    });
  });

  router.post('/register', function (req, res) {
    let hash = sha256(req.body.password);
    req.body.password = hash;

    User.create(req.body, function (err) {
      if (err != undefined) {
        res.send({ sts: false, msg: err });
      } else {
        if (req.body.type == 'Tutor') {
          res.send({ sts: false, msg: err });
          //res.redirect('/tutor_register');
        } else {
          res.send({ sts: true });
        }
      }
    });
  });
};
