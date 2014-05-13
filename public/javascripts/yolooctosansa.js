var socket = io.connect('/');
var nameStr;
var colStr;
// check for the initial test
socket.on('test', function(data) {
	$("#testArea").text(data.message);
});
