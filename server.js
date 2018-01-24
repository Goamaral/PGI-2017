const enrouten = require('express-enrouten');
const mongoose = require('mongoose');
const session = require('express-session');
const sslRedirect = require('heroku-ssl-redirect');
const http = require('http');
const app = require('express')();
const webpackDevMiddleware = require('webpack-dev-middleware');

// Load config
require('dotenv').config();

// Start server
const server = http.createServer(app);
server.listen(process.env.PORT || 8080);
server.on(
  'listening',
  function() {
    console.log('Server listening on http://localhost:%d', this.address().port)
  }
);

// database
const mongoUrl = 'mongodb://' + process.env.db_username + ':'
  + process.env.db_password + '@ds141766.mlab.com:41766/uteach';
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
app.use(session({ secret: 'uteach', resave: true, saveUninitialized: false, }));
// Webpack
let webpackConfigFile = '';
switch (process.env.node_env) {
  case 'production':
    webpackConfigFile = './webpack.prod.js';
    break;
  case 'development':
    webpackConfigFile = './webpack.dev.js';
    break;
}

const webpackConfig = require(webpackConfigFile);

const compiler = require('webpack')(webpackConfig);
app.use(
  webpackDevMiddleware(
    compiler,
    { publicPath: webpackConfig.output.publicPath }
  )
);

app.on('start', () => { console.log('Application ready to serve requests.') });

process.on('exit', () => { db.close() });
