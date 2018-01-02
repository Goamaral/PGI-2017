'use strict';

const sha256 = require('js-sha256').sha256;
const User = require('../models/User');
const Tutor = require('../models/Tutor');
const Topic = require('../models/Topic');
const mongoose = require('mongoose');

const auth = (req, res, next) => {
  if (req.session && req.session.userID) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = (router) => {
  router.get('/', (req, res) => {
    res.locals.csrf = req.csrfToken();
    res.render('index');
  });

  router.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.redirect('/');
    } else {
      if (user.password == sha256(req.body.password)) {
        req.session.userID = user._id;
        res.redirect('/tutors-list');
      } else res.redirect('/');
    }
  });

  router.post('/register', async (req, res) => {
    req.body.password = sha256(req.body.password);

    let user = await User.create(req.body);

    if (!user) {
        res.redirect('/');
    } else {
      req.session.userID = user._id;
      res.redirect('/tutors-list');
    }
  });

  router.get('/logout', (req, res) => {
    if (req.session)
      req.session.destroy(() => {
        res.redirect('/')
      });
  });

  router.get('/tutors-list', auth, (req, res) => {
    res.locals.csrf = req.csrfToken();
    renderTutorsList('tutors-list', req, res);
  });

  router.post('/tutors-list-ajax', auth, (req, res) => {
    renderTutorsList('tutors-list-ajax', req, res);
  });

  async function renderTutorsList(route, req, res) {
    let tutors = await Tutor.find({});

    if (tutors.length == 0) {
      res.locals.tutorsInfo = tutors;
      res.render(route);
    } else {
      let normalizedTutors = [];

      for (let tutor of tutors) {
        let user = await User.findById(tutor.userID);
        let { rating, topicIDs, userID } = tutor;
        let { name } = user;
        let normalizedTutor = { name, rating, topicIDs, userName: user.name, userID };
        normalizedTutors.push(normalizedTutor);
      }

      let tutorsInfo = [];

      for (let tutor of normalizedTutors) {
        for (let topicID of tutor.topicIDs) {
          let topic = await Topic.findById(topicID);
          if (topic.name != '') {
            let { topicIDs, ...tutorInfo } = { ...tutor };
            tutorInfo.topicName = topic.name;
            tutorInfo.fieldName = topic.field;
            tutorsInfo.push(tutorInfo);
          }
        }
      }

      res.locals.tutorsInfo = tutorsInfo;

      res.locals.tutorsInfo.sort((a, b) => {
        if (a.rating > b.rating) return -1;
        if (a.rating < b.rating) return 1;
        return 0;
      });

      if(route == 'tutors-list-ajax') {
        let suggestion = req.body.suggestion.toLowerCase();

        res.locals.tutorsInfo = res.locals.tutorsInfo.filter((tutorInfo) => {
          let result = true;
          let topicName = tutorInfo.topicName.toLowerCase();
          let fieldName = tutorInfo.fieldName.toLowerCase();

          for (let letter of suggestion) {
            result = result && (topicName.includes(letter) || fieldName.includes(letter));
          }

          return result;
        });
      }

      res.render(route);
    }
  }

  router.get('/tutorProfile', auth, async (req, res) => {
    let userID = req.query.userID;

    let user = await User.findById(userID);
    res.locals.user = user;

    let tutor = await Tutor.findById(user.tutorID);
    res.locals.tutor = tutor;

    res.locals.topics = [];

    for (let topicID of tutor.topicIDs) {
      let topic = await Topic.findById(topicID);
      res.locals.topics.push(topic);
    }

    res.render('tutorProfile');
  });

  router.get('/profile', auth, async (req, res) => {
    let user = await User.findById(req.session.userID);

    if (!user) {
      res.redirect('/logout');
    } else {
      res.locals.user = user;
      res.locals.csrf = req.csrfToken();
      res.locals.isStudent = true;

      if(user.tutorID) {
        res.locals.isStudent = false;
        let tutor = await Tutor.findById(user.tutorID);
        res.locals.tutor = tutor;
        res.locals.topics = [];

        for (let topicID of tutor.topicIDs) {
          let topic = await Topic.findById(topicID);
          res.locals.topics.push(topic);
        }
      }

      res.render('profile');
    }
  });

  router.post('/saveProfile', auth, async (req, res) => {
    let tidyObject = tideReqBody();
    let newTopics = tidyObject.topics;
    let newUser = tidyObject.user;

    await User.updateOne({ _id: req.session.userID }, newUser);

    let user = await User.findById(req.session.userID);

    if (user.tutorID) {
      let tutor = await Tutor.findById(user.tutorID);
      for (let i = 0; i < tutor.topicIDs.length; ++i) {
        await Topic.updateOne({ _id: tutor.topicIDs[i] }, newTopics[i]);
      }
    }

    res.redirect('/profile');

    function tideReqBody() {
      let {
        name, email, phone, course, rank, year, password,
        topic0, field0,
        topic1, field1,
        topic2, field2
      } = req.body;

      if (password) password = sha256(password);

      let user = { name, email, phone, course, rank, year, password };
      washObject(user);

      let topics = [
        { name: topic0, field: field0 },
        { name: topic1, field: field1 },
        { name: topic2, field: field2 }
      ];

      return { user, topics};

      function washObject(object) {
        for (var prop in object) if (!object[prop]) delete object[prop];
      }
    }
  });

  router.get('/becomeTutor', auth, async (req, res) => {
    let topicIDs = [];

    for (let i = 0; i < 3; ++i) {
      let topic = await Topic.create({});
      topicIDs.push(topic._id);
    }

    let tutor = await Tutor.create({ topicIDs: topicIDs, userID: req.session.userID });

    await User.updateOne({ _id: req.session.userID }, { tutorID: tutor._id });

    res.redirect('/profile');
  });
};
