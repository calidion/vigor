var isLogin = require('../../policies/isLogin');
var mailer = require('../../util/mailer');
var uuid = require('node-uuid');
var async = require('async');
module.exports = {
  urls: [
    '/thread/invite/:id'
  ],
  routers: {
    post: function (req, res) {
      var emails = req.body.emails;
      if (!emails || emails.length <= 0) {
        return res.errorize(res.errors.InputInvalid);
      }
      var Thread = req.models.Thread;
      var extracted = req.extracted.params;
      var user = req.session.user;

      Thread.findOne({
        id: extracted.id
      })
        .populate('author')
        .populate('posts')
        .then(function (thread) {
          if (!thread) {
            return res.errorize(res.errors.ThreadNotExists);
          }
          return async.each(emails, function sendmail(email, cb) {
            var token = String(uuid.v4());
            mailer.thread.invite(email,
              token, user, thread, function (error, data) {
                console.warn(error, data);
                cb();
              });
          }, function () {
            res.errorize(res.errors.Success);
          });
        }).fail(res.onError);
    },
    get: function (req, res) {
      var Thread = req.models.Thread;
      var extracted = req.extracted.params;
      Thread.findOne(
        {
          id: extracted.id
        }
      )
        .populate('author')
        .populate('posts')
        .then(function (thread) {
          if (!thread) {
            return res.onPageError('此话题不存在或已被删除。');
          }
          return res.showPage('thread/invite',
            {
              title: '邀请大牛解答',
              thread: thread
            });
        }).fail(res.onError);
    }
  },
  policies: {
    all: isLogin
  },
  validations: {
    get: {
      required: ['params'],
      params: {
        id: {
          type: 'string',
          required: true
        }
      }
    },
    post: {
      required: ['params'],
      params: {
        id: {
          type: 'string',
          required: true
        }
      }
    }
  }
};
