var isLogin = require('../../policies/isLogin');
var inputInvalidHandler = require('../../errors/handlers/InputInvalid');

module.exports = {
  urls: ['/group/list'],
  routers: {
    get: function (req, res) {
      var user = req.session.user;
      var GroupMember = req.models.GroupMember;
      GroupMember.find({
        member: user.id
      }).populate('group').then(function (groups) {
        return res.errorize(res.errors.Success, groups);
      }).fail(res.onError);
    }
  },
  policies: {
    get: isLogin
  },
  validations: {
    get: {
      query: {
        page: {
          type: 'int'
        },
        limit: {
          type: 'int'
        }
      }
    }
  },
  failures: {
    validation: inputInvalidHandler
  }
};
