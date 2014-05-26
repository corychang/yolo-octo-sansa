var passport = require('passport');
var home = require('../app/controllers/home_controller');
var sessions = require('../app/controllers/sessions_controller');

module.exports = function(app){
	// controllers
	// routes
	app.get('/', home.index);
	app.get('/login', sessions.login);
	// passport magic
	app.get('/auth/facebook', passport.authenticate('facebook'), function(req, res) {
		// should never get called
	});

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), function(req, res) {
		console.log('req.user is ' + req.user);
		return res.redirect('/');
	});

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

}
