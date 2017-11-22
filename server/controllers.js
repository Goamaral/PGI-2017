const users = require('./routes/users');

const controllers = app => {
  app.use('/users', users);
  return app;
}

module.exports = controllers;
