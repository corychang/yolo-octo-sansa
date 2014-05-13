exports.init = function(io) {
  io.sockets.on('connection', function(socket) {
    socket.emit('test', {'message': 'ready to go'});
  });
}
