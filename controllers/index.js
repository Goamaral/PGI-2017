'use strict';

var bcrypt = require('bcrypt');
//var session = require('express-session');
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
        res.send({ sts: req.body.password == user[0].password });
        /*
        if (bcrypt.compareSync(req.body.password, user[0].password)) {
          res.send({ sts: true });
        } else {
          res.send({ sts: false, msg: user[0].password + ' vs ' + hash });
        }
        */
      }
    });


  });

  router.post('/register', function (req, res) {
    //let hash = bcrypt.hashSync(req.body.password);
    //req.body.password = hash;
    User.create(req.body, function (err) {
      if (err != undefined) {
        res.send({ sts: false, msg: err });
      } else res.send({ sts: true });
    });
  });
};
