var isLogin = require('../../policies/isLogin');
var inputInvalidHandler = require('../../errors/handlers/InputInvalid');

module.exports = {
  urls: ['/group/my'],
  routers: {
    get: function (req, res) {
      var user = req.session.user;
      var Group = req.models.Group;
      Group.find({
        creator: user.id
      }).then(function (groups) {
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
