var isLogin = require('../../policies/isLogin');
var config = require('../../../config');
var inputInvalidHandler = require('../../errors/handlers/InputInvalid');
var _ = require('lodash');
module.exports = {
  urls: ['/message/list'],
  routers: {
    get: function (req, res) {
      var user = req.session.user;
      var InstantMessage = req.models.InstantMessage;
      var extracted = req.extracted.query;

      var limit = _.defaultTo(extracted.limit, config.site.pagination.normal);
      var page = _.defaultTo(extracted.page, 1);
      var unread = _.defaultTo(extracted.unread, 'false');
      var before = _.defaultTo(extracted.before, null);
      var after = _.defaultTo(extracted.after, null);
      if (page <= 1) {
        page = 1;
      }
      var sorts = {
        createdAt: 'desc'
      };
      var options = {
        or: [
          {
            sender: user.id,
            receiver: extracted.id
          },
          {
            receiver: user.id,
            sender: extracted.id
          }
        ]
      };
      if (unread === 'true') {
        for (let i = 0; i < options.or.length; i++) {
          options.or[i].read = false;
        }
      }
      if (before) {
        options.createdAt = {
          '<': before
        };
      }
      if (after) {
        options.createdAt = {
          '>': after
        };
        sorts = {
          createdAt: 'asc'
        };
      }

      InstantMessage.find(options).populate('receiver')
        .populate('sender').sort(sorts).limit(limit).skip(limit * (page - 1)).then(function (messages) {
          res.errorize(res.errors.Success, messages);
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
        id: {
          type: 'string',
          required: true
        },
        unread: {
          type: 'bool'
        },
        before: {
          type: 'date'
        },
        after: {
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
