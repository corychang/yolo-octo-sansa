// set up dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var sio = require('socket.io');
var serverSockets = require('./controllers/serverSocket.js');
// express
var app = express();

// configure express
app.set('views', __dirname + '/views');
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
