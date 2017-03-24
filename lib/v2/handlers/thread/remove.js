var isThreadAuthor = require('../../policies/isThreadAuthor');
var config = require('../../../config');

function onError(err, req, res) {
  res.status(403);
  return res.showPage('notify/notify', {
    error: err
  });
}

module.exports = {
  urls: [
    '/thread/remove/:id',
    '/thread/delete/:id'
  ],
  routers: {
    get: function (req, res) {
      console.log(req.temporary);
      return res.showPage('thread/remove', {
        thread: req.temporary.thread,
        message: '确定要删除当前帖子吗？',
        tabs: config.site.tabs
      });
    },
    post: function (req, res) {
      var Thread = req.models.Thread;
      var extracted = req.extracted.params;
      Thread.destroy({
        id: extracted.id
      }).then(function (removed) {
        console.log(removed)
        return res.showPage('thread/remove', {
          success: '删除成功!'
        });
      }).fail(res.onError);
    }
  },
  policies: {
    all: isThreadAuthor
  },
  validations: {
    post: {
      params: {
        id: {
          type: 'string',
          required: true
        }
      }
    }
  },
  failures: {
    policy: function (data, req, res) {
      console.log(data);
      onError('你无权删除当前话题!', req, res);
    },
    validation: function (data, req, res) {
      onError('输入不正确!', req, res);
    }
  }
};
