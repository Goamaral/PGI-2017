const path = require('path');
const enrouten = require('express-enrouten');
const mongoose = require('mongoose');
const session = require('express-session');
const sslRedirect = require('heroku-ssl-redirect');
const http = require('http');
require('dotenv').config();
const mongoUrl = 'mongodb://' + process.env.db_username + ':' + process.env.db_password + '@ds141766.mlab.com:41766/uteach';
const app = module.exports = require('express')();

// Start server
const server = http.createServer(app);
server.listen(process.env.PORT || 8080);
server.on('listening', function () {
  console.log('Server listening on http://localhost:%d', this.address().port);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// database
mongoose.connect(mongoUrl, { useMongoClient: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// middleware
// enable ssl redirect - HTTPS
app.use(sslRedirect(['other', 'development', 'production']));
// dynamic routing
app.use(enrouten({}));
// Session
app.use(session({
  secret: 'uteach',
  resave: true,
  saveUninitialized: false,
}));

app.on('start', function () {
  console.log('Application ready to serve requests.');
});

process.on('exit', function() {
  db.close();
});
