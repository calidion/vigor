var isLogin = require('../../../policies/isLogin');
var mailer = require('../../../util/mailer');
var uuid = require('node-uuid');

module.exports = {
  urls: ['/group/member/invite'],
  routers: {
    post: function (req, res) {
      var user = req.session.user;
      var extracted = req.extracted.body;
      var User = req.models.User;
      var GroupMemberInvite = req.models.GroupMemberInvite;
      var GroupMember = req.models.GroupMember;
      var token = String(uuid.v4());

      // if Sender has membership
      GroupMember.findOne({
        group: extracted.group,
        member: user.id
      }).then(function (sender) {
        if (!sender) {
          return res.errorize(res.errors.GroupMemberRequired);
        }

        // if receiver has membership

        return User.findOne({
          email: extracted.email
        }).then(function (found) {
          if (found) {
            return GroupMember.findOne({
              group: extracted.group,
              member: found.id
            }).then(function (groupFound) {
              if (groupFound) {
                res.errorize(res.errors.GroupMemberExists);
                return true;
              }
              return false;
            });
          }
          return false;
        }).then(function (found) {
          // Send a mail if receiver is not a member
          if (!found) {
            return GroupMemberInvite.create({
              sender: user.id,
              group: extracted.group,
              email: extracted.email,
              token: token
            }).then(function (invitation) {
              mailer.group.member.invite(extracted.email,
                extracted.group, user, token, function () {
                  return res.errorize(res.errors.Success, {
                    token: invitation.token,
                    email: invitation.email,
                    group: invitation.group
                  });
                });
            });
          }
        }).fail(res.onError);
      });
    }
  },
  policies: {
    post: isLogin
  },
  validations: {
    post: {
      required: ['body'],
      body: {
        group: {
          type: 'string',
          required: true
        },
        email: {
          type: 'email',
          required: true
        }
      }
    }
  }
};
