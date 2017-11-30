const registration = require('./routes/registration');
//const home = require('./routes/home');

const controllers = app => {
  app.use('*', registration);

  return app;
}

module.exports = controllers;
