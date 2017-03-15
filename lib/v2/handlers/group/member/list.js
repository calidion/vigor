var isLogin = require('../../../policies/isLogin');
var inputInvalidHandler = require('../../../errors/handlers/InputInvalid');

module.exports = {
  urls: ['/group/member/list', '/groups/members'],
  routers: {
    get: function (req, res) {
      var user = req.session.user;
      var GroupMember = req.models.GroupMember;
      var extracted = req.extracted.query;
      var page = extracted.page ? extracted.page : 1;
      if (page <= 1) {
        page = 1;
      }

      GroupMember.findOne({
        member: user.id,
        group: extracted.group
      }).then(function (found) {
        if (!found) {
          return res.errorize(res.errors.GroupNotFound);
        }
        var conditions = {
          group: extracted.group
        };
        switch (extracted.type) {
          case 'creator':
            conditions.type = {
              '!': ['member', 'administrator']
            };
            break;
          case 'administrator':
          case 'admin':
            conditions.type = {
              '!': ['member']
            };
            break;
          default:
            break;
        }
        GroupMember.find(conditions).sort({
          createdAt: 'desc'
        }).populate('group').populate('member').then(function (members) {
          return res.errorize(res.errors.Success, {
            members: members
          });
        }).fail(res.onError);
      });
    }
  },
  policies: {
    get: isLogin
  },
  validations: {
    get: {
      required: ['query'],
      query: {
        group: {
          type: 'string',
          required: true
        },
        type: {
          type: 'enum',
          enums: ['creator', 'administrator', 'admin', 'member']
        },
        limit: {
          type: 'int'
        },
        page: {
          type: 'int'
        }
      }
    }
  },
  failures: {
    validation: inputInvalidHandler
  }
};
