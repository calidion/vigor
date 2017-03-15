var isLogin = require('../../../policies/isLogin');
var config = require('../../../../config');
var inputInvalidHandler = require('../../../errors/handlers/InputInvalid');

module.exports = {
  urls: ['/group/message/list'],
  routers: {
    get: function (req, res) {
      var user = req.session.user;
      var GroupMember = req.models.GroupMember;
      var GroupMessage = req.models.GroupMessage;
      var extracted = req.extracted.query;
      var limit = extracted.limit ? extracted.limit : config.site.pagination.normal;
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
        var options = {
          group: extracted.group
        };

        if (extracted.since) {
          options.createdAt = {
            '>': extracted.since
          };
        }
        return Promise.all([
          GroupMember.update(
            {
              id: found.id
            },
            {
              lastFetch: new Date()
            }),
          GroupMessage.find(options).populate('sender').sort({
            createdAt: 'desc'
          }).limit(limit).skip(limit * (page - 1))
        ]).then(function (data) {
          return res.errorize(res.errors.Success, {
            lastFetch: found.lastFetch,
            messages: data[1]
          });
        }).catch(res.onError);
      }).fail(res.onError);
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
        since: {
          type: 'date'
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
