var socketIO = require('socket.io');
var session = require('./session');

var onIO = require('./socket.io/on');

module.exports = function (server, cb) {
  var sio = socketIO(server);
  sio.use(function (socket, next) {
    session(socket.request, socket.request.res, next);
  });

  // Websocket Only
  sio.set('transports', ['websocket']);

  sio.origins('*:*');

  sio.sockets.on('connection', function (socket) {
    // console.info('New connection established!');
    onIO.connected(sio, socket, cb);
  });
  return sio;
};
