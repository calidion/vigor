var isLogin = require('../../policies/isLogin');
var at = require('../../util/at');
var config = require('../../../config');
var wrongInput = require('../../failures/wrongInput');

module.exports = {
  urls: [
    '/thread/create'
  ],
  routers: {
    get: function (req, res) {
      res.showPage('thread/create', {
        tabs: config.site.tabs
      });
    },
    post: function (req, res) {
      var Thread = req.models.Thread;
      var User = req.models.User;
      var user = req.session.user;
      var extracted = req.extracted.body;
      extracted.author = user.id;
      Thread.create(extracted).then(function (thread) {
        user.score = user.score - 0 + 5;
        user.threads = user.threads - 0 + 1;
        return User.update({
          id: user.id
        },
          {
            score: user.score,
            threads: user.threads
          }).then(function () {
            // 发送at消息
            at.parse(req, thread.content, {
              sender: user,
              thread: thread
            });
            res.redirect('/thread/visit/' + thread.id);
          });
      }).fail(res.onError);
    }
  },
  policies: {
    all: isLogin
  },
  validations: {
    post: {
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
    validation: wrongInput
  }
};
