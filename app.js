// set up dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var sio = require('socket.io');
var serverSockets = require('./app/controllers/serverSocket.js');

// passport magic
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require(__dirname + '/config/keys');
console.log('keys is ' + keys);

var FACEBOOK_APP_ID = keys.app_id;
console.log("app id is " + keys.app_id);
var FACEBOOK_APP_SECRET = keys.app_secret;
console.log("app secret is " + keys.app_secret);

// not sure why I need this but I do
passport.serializeUser(function(user, done) {
  done(null, user);
});

// same as above
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));


// express
var app = express();

// configure express
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

require('./config/routes')(app);

// start the server and begin using socket io
var server = http.createServer(app);
var io = sio.listen(server);
server.listen(12345, function(){
  console.log("Express server listening on port 12345");
	});

// initialize socketio
serverSockets.init(io);
