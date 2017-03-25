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
      return res.showPage('thread/remove', {
        thread: req.temporary.thread,
        message: '确定要删除当前帖子吗？',
        tabs: config.site.tabs
      });
    },
    post: function (req, res) {
      var Thread = req.models.Thread;
      var Post = req.models.Post;
      var extracted = req.extracted.params;
      Promise.all([
        Post.destroy({
          thread: extracted.id
        }),
        Thread.destroy({
          id: extracted.id
        })
      ]).then(function () {
        return res.showPage('thread/remove', {
          success: '删除成功!'
        });
      }).catch(res.onPageError);
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
      console.error(data);
      onError('你无权删除当前话题!', req, res);
    },
    validation: function (data, req, res) {
      onError('输入不正确!', req, res);
    }
  }
};
