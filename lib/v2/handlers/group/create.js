var isLogin = require('../../policies/isLogin');
var inputInvalidHandler = require('../../errors/handlers/InputInvalid');

module.exports = {
  urls: ['/group/create'],
  routers: {
    post: function (req, res) {
      var user = req.session.user;
      var extracted = req.extracted.body;
      var Group = req.models.Group;
      var GroupMember = req.models.GroupMember;
      extracted.creator = user.id;
      Group.create(extracted).then(function (created) {
        GroupMember.create({
          group: created.id,
          member: user.id,
          type: 'creator'
        }).then(function () {
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
        name: {
          type: 'string',
          required: true
        },
        desc: {
          type: 'string'
        }
      }
    }
  },
  failures: {
    validation: inputInvalidHandler
  }
};
