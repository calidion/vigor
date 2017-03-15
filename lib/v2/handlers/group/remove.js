var isLogin = require('../../policies/isLogin');
var inputInvalidHandler = require('../../errors/handlers/InputInvalid');

module.exports = {
  urls: ['/group/remove'],
  routers: {
    post: function (req, res) {
      var user = req.session.user;
      var extracted = req.extracted.body;
      var Group = req.models.Group;
      var GroupMember = req.models.GroupMember;
      Group.findOne({
        id: extracted.id,
        creator: user.id
      }).then(function (group) {
        if (group) {
          Promise.all([GroupMember.destroy({
            group: extracted.id
          }),
          Group.destroy({
            id: extracted.id,
            creator: user.id
          })
          ]).then(() => {
            return res.errorize(res.errors.Success);
          }).catch(res.onError);
        } else {
          return res.errorize(res.errors.GroupNotFound);
        }
      }).fail(res.onError);
    }
  },
  policies: {
    post: isLogin
  },
  validations: {
    post: {
      body: {
        id: {
          type: 'string',
          required: true
        }
      }
    }
  },
  failures: {
    validation: inputInvalidHandler
  }
};
