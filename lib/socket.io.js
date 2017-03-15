var socketIO = require('socket.io');
var session = require('./session');

var onIO = require('./socket.io/on');

var config = require('./config');

module.exports = function (server, cb) {
  var sio = socketIO(server);
  sio.use(function (socket, next) {
    session(socket.request, socket.request.res, next);
  });
  // sio.set('transports', ['websocket']);
  var origins = config.site.cors.allowed;
  if (process.env.SOCKETIO_DEBUG > 0) {
    origins = '*:*';
  }
  sio.origins(origins);

  sio.sockets.on('connection', function (socket) {
    // console.info('New connection established!');
    onIO.connected(sio, socket, cb);
  });
  return sio;
};
