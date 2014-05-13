module.exports = function(app){
	// controllers
	var home = require('../controllers/home_controller');
	// routes
	app.get('/', home.index);
}
