var vig = require('vig');

var mailer = require('../v2/util/mailer');

var events = new vig.VEvent();

var userSockets = {
};

var groupHandler = require('./group');

function sendMessage(receiver, message) {
  // if (!receiver || !receiver.id) {
  //   return false;
  // }
  var id = receiver.id;
  var s = userSockets[id];
  if (s) {
    s.emit('message', message);
  } else {
    return false;
  }
  return true;
}

// 接收好友消息
events.on('sio-message', function (message, mailing) {
  // Send Message to receiver
  if (!sendMessage(message.receiver, message) && mailing) {
    mailer.message.new(message.receiver, message.sender, function () { });
  }
});

// 接收群组消息
events.on('sio-group-message', function (models, message, mailing) {
  groupHandler.onlineMemberNotify(models,
    message.group,
    userSockets,
    message,
    mailing
  );
});

function Socket(sio, socket, cb) {
  socket.on('message', function (data) {
    if (cb && cb instanceof Function) {
      cb(data);
    }
  });
  socket.on('disconnect', function () {
    delete userSockets[socket._uid];
  });

  // var user = socket.request.session;
  // socket.request.session 
  // Now it's available from Socket.IO sockets too! Win!
  if (process.env.FORIM_BY_PASS_POLICIES > 0) {
    if (!socket.request.session.user) {
      socket.request.session.user = {
        id: 1
      };
    }
  }

  if (!socket.request.session.user) {
    console.error('No user found!');
    // socket.disconnect();
    if (cb instanceof Function) {
      cb();
    }
    return;
  }
  var user = socket.request.session.user;

  userSockets[user.id] = socket;
  userSockets['-1'] = socket;   // for test only
  socket._uid = user.id;
  // getMessage(user);
}

module.exports = {
  connected: Socket
};
