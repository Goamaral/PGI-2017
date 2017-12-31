'use strict';

const sha256 = require('js-sha256').sha256;
const User = require('../models/User');

const auth = function (req, res, next) {
  if (req.session && req.session.userID) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.locals.csrf = req.csrfToken();
    res.render('index');
  });

  router.post('/login', function (req, res) {
     User.findOne({ email: req.body.email }, function (err, user) {
      if (err || !user) {
        res.redirect('/');
      } else {
        if (user.password == sha256(req.body.password)) {
          req.session.userID = user._id;
          res.redirect('/tutors-list');
        } else res.redirect('/');
      }
    });
  });

  router.post('/register', function (req, res) {
    req.body.password = sha256(req.body.password);

    User.create(req.body, function (err, user) {
      if (err || !user) {
        res.redirect('/');
      } else {
        req.session.userID = user._id;
        res.redirect('/tutors-list');
      }
    });
  });

  router.get('/logout', function (req,res) {
    if (req.session) {
      req.session.destroy(function () {
        res.redirect('/');
      });
    }
  });

  router.get('/tutors-list', auth, function (req, res) {
    res.render('tutors-list');
  });

  router.get('/profile', auth, function (req, res) {
    User.findOne({ _id: req.session.userID }, function (err, user) {
      if (err || !user) {
        res.redirect('/logout');
      } else {
        console.log(user.tutor);

        res.locals.user = user;
        res.locals.csrf = req.csrfToken();
        res.locals.isStudent = user.tutor === undefined;

        if(!res.locals.isStudent) {
          // TODO Fill topics / areas
        }

        res.render('profile');
      }
    });
  });

  router.post('/saveProfile', auth, function (req, res) {
    // TODO Save editted profile
  });

  router.get('/becomeTutor', auth, function (req, res) {
    // TODO Associate tutor to user
  });
};
