var isLogin = require('../../../policies/isLogin');
var onPolicyFailure = require('../../../failures/policy/githubOauth');

module.exports = {
  urls: ['/group/member/ack'],
  routers: {
    get: function (req, res) {
      var user = req.session.user;
      var extracted = req.extracted.query;
      var GroupMemberInvite = req.models.GroupMemberInvite;
      var GroupMember = req.models.GroupMember;
      var GroupMessageRead = req.models.GroupMessageRead;
      var SystemMessageGroupMemberRead = req.models.SystemMessageGroupMemberRead;

      var options = {
        email: extracted.email,
        token: extracted.token,
        group: extracted.group
      };

      if (user.email !== extracted.email) {
        return res.errorize(res.errors.EmailNotMatch);
      }

      options.processed = false;

      GroupMemberInvite.findOne(options).then(function (invite) {
        if (!invite) {
          return res.errorize(res.errors.InvitationNotFound);
        }
        return GroupMemberInvite.update(
          {
            id: invite.id
          },
          {
            processed: true
          }).then(function () {
            if (extracted.status === 'reject') {
              return res.errorize(res.errors.Success, {
                note: '成功拒绝!'
              });
            }
            GroupMember.findOne({
              group: extracted.group,
              member: user.id
            }).then(function (member) {
              if (member) {
                return res.errorize(res.errors.GroupMemberExists);
              }
              Promise.all([
                GroupMember.create({
                  group: extracted.group,
                  member: user.id
                }),
                GroupMessageRead.create({
                  group: extracted.group,
                  member: user.id
                }),
                SystemMessageGroupMemberRead.create({
                  group: extracted.group,
                  member: user.id
                })
              ]).then(() => {
                return res.errorize(res.errors.Success, {
                  note: '成功添加!'
                });
              });
            });
          });
      }).fail(res.onError);
    }
  },
  failures: {
    policy: onPolicyFailure
  },
  policies: {
    get: isLogin
  },
  validations: {
    get: {
      query: {
        email: {
          type: 'email',
          required: true
        },
        group: {
          type: 'string',
          required: true
        },
        token: {
          type: 'string',
          required: true
        },
        status: {
          type: 'enum',
          required: true,
          enums: ['accept', 'reject']
        }
      }
    }
  }
};
