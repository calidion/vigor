var isThreadAuthor = require('../../policies/isThreadAuthor');
var config = require('../../../config');
var notLogin = require('../../failures/notLogin');
var wrongInput = require('../../failures/wrongInput');

module.exports = {
  urls: [
    '/thread/edit/:id'
  ],
  routers: {
    get: function (req, res) {
      var Thread = req.models.Thread;
      var extracted = req.extracted.params;
      Thread.findOne({
        id: extracted.id
      }).then(function (found) {
        if (!found) {
          res.onPageError('此话题不存在或已被删除。');
        }
        res.showPage('thread/edit', {
          action: 'edit',
          thread: found,
          tabs: config.site.tabs
        });
      }).fail(res.onError);
    },
    post: function (req, res) {
      var Thread = req.models.Thread;
      var params = req.extracted.params;
      var extracted = req.extracted.body;
      Thread.findOne({
        id: params.id
      }).then(function (found) {
        if (!found) {
          return res.onPageError('此话题不存在或已被删除。', req, res);
        }
        var updates = {
          title: extracted.title,
          category: extracted.category,
          content: extracted.content,
          updatedAt: new Date()
        };
        Thread.update({
          id: found.id
        }, updates).then(function () {
          res.redirect('/thread/visit/' + found.id);
        });
      }).fail(res.onError);
    }
  },
  policies: {
    all: isThreadAuthor
  },
  validations: {
    get: {
      params: {
        id: {
          type: 'string',
          required: true
        }
      }
    },
    post: {
      params: {
        id: {
          type: 'string',
          required: true
        }
      },
      body: {
        title: {
          type: 'string',
          required: true
        },
        content: {
          type: 'text',
          required: true
        },
        category: {
          type: 'string',
          required: true
        }
      }
    }
  },
  failures: {
    policies: notLogin,
    validation: wrongInput
  }
};
