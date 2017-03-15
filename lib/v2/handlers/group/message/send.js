var isLogin = require('../../../policies/isLogin');
// var message = require('../../sharable/im');
var vig = require('vig');
var inputInvalidHandler = require('../../../errors/handlers/InputInvalid');

module.exports = {
  urls: ['/group/message/send'],
  routers: {
    post: function (req, res) {
      var user = req.session.user;
      var extracted = req.extracted.body;
      var GroupMember = req.models.GroupMember;
      var GroupMessage = req.models.GroupMessage;

      GroupMember.findOne({
        member: user.id,
        group: extracted.group
      }).populate('group').then(function (found) {
        if (!found) {
          return res.errorize(res.errors.GroupNotFound);
        }
        GroupMessage.create({
          group: extracted.group,
          sender: user.id,
          text: extracted.text
        }).then(function (created) {
          created.group = found.group;
          created.sender = user;
          vig.events.send('sio-group-message', created, true);
          return res.errorize(res.errors.Success, created.toJSON());
        }).fail(res.onError);
      }).fail(res.onError);
    }
  },
  policies: {
    post: isLogin
  },
  validations: {
    post: {
      body: {
        group: {
          type: 'string',
          required: true
        },
        text: {
          type: 'text',
          required: true
        }
      }
    }
  },
  failures: {
    validation: inputInvalidHandler
  }
};
