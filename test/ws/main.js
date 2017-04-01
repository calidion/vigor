// var app = require('../../lib/app');
// var server = require('http').createServer(app);

// var WebSocket = require('ws');
// var port = 2500;
// var host = '127.0.0.1';

// describe('WebSocket', function () {
//   before(function (done) {
//     console.log('inside listening');
//     server.listen(port, host, function() {
//       console.log(arguments);
//       done();
//     });
//   });

//   after(function () {
//     console.log('inside closing');
//     server.close();
//   });

//   it('should connect to server', function (done) {
//     var connect = `ws://${host}:${port}/`;
//     console.log(connect);
//     var ws = new WebSocket(connect);
//     ws.onopen = function() {
//       ws._socket.write(Buffer.from([0x85, 0x00]));
//       done();
//     }
//   });
// });
