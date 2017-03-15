var isLogin = require('../../policies/isLogin');
var inputInvalidHandler = require('../../errors/handlers/InputInvalid');

module.exports = {
  urls: ['/group/update'],
  routers: {
    post: function (req, res) {
      var user = req.session.user;
      var extracted = req.extracted.body;
      var Group = req.models.Group;
      extracted.creator = user.id;
      var options = {
        name: extracted.name
      };
      if (extracted.desc) {
        options.desc = extracted.desc;
      }
      Group.update({
        id: extracted.id,
        creator: user.id
      }, options).then(function (created) {
        return res.errorize(res.errors.Success, created[0].toJSON());
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
        },
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
