var groupLogic = require('../v2/logics/group');

module.exports = {
  onlineMemberNotify: function (models, group, onlineSockets, message) {
    groupLogic
      .members(models, group)
      .then(function (members) {
        for (var i = 0; i < members.length; i++) {
          var socket = onlineSockets[members[i].member.id];
          if (members[i].member.id === message.sender.id) {
            continue;
          }
          if (socket) {
            socket.emit('group-message', message);
          }
        }
      });
  }
};
