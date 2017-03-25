var isPostAuthor = require('../../policies/isPostAuthor');
module.exports = {
  urls: [
    '/post/remove/:id'
  ],
  routers: {
    post: function (req, res) {
      var Post = req.models.Post;
      var User = req.models.User;
      var Thread = req.models.Thread;
      var user = req.session.user;
      var thread;
      var post = req._post;
      thread = post.thread;
      if (!thread) {
        res.showPage('notifiy/notify', {
          err: '主题不存在!'
        });
        return false;
      }
      if (thread.locked) {
        res.showPage('notifiy/notify', {
          err: '主题已经锁定!'
        });
        return false;
      }
      return Promise.all(
        [
          Thread.update(
            {
              id: thread.id
            },
            {
              replies: thread.replies - 1
            }
          ),
          User.update(
            {
              id: user.id
            },
            {
              score: user.score - 5,
              replies: user.replies - 1
            }
          ),
          Post.destroy(
            {
              id: post.id
            }
          )
        ]
      ).then(function () {
        return res.showPage('notify/notify', {
          refresh: '/thread/visit/' + thread.id,
          success: '删除成功!'
        });
      }).catch(res.onError);
    }
  },
  policies: {
    all: isPostAuthor
  },
  validations: {
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
