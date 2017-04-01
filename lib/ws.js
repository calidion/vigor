// var ews = require('express-ws');

// var userSockets = require('./ws/sockets');

// var events = require('./ws/events');

// module.exports = function (app) {
//   ews(app);
//   // 这里只用于接入WS，并做1对1的记录。通过user.id保存ws连接并共享
//   app.ws('/', function (ws, req) {
//     console.log('inside ws');
//     if (!req.session || !req.session.user) {
//       console.error('No user Login, WebSocket terminated!');
//       return ws.close();
//     }
//     var user = req.session.user;
//     if (userSockets[user.id]) {
//       userSockets[user.id].close();
//     }
//     userSockets[user.id] = ws;
//     ws.on('message', function (msg) {
//       ws.send(msg);
//     });
//     ws.on('disconnect', function () {
//       delete userSockets[user.id];
//     });
//   });
//   // 初始化ws相关的事件
//   events();
// };
