var isLogin = require('../../policies/isLogin');
var at = require('../../util/at');

module.exports = {
  urls: [
    '/post/create/:id'
  ],
  routers: {
    post: function (req, res) {
      var Post = req.models.Post;
      var Message = req.models.Message;
      var User = req.models.User;
      var Thread = req.models.Thread;
      var user = req.session.user;
      var extracted = req.extracted;
      var thread;
      var post;
      Thread.findOne({
        id: extracted.params.id
      }).populate('author')
        .populate('posts')
        .then(function (found) {
          thread = found;
          if (!thread) {
            res.showPage('notify/notify', {
              error: '主题不存在!'
            });
            return false;
          }
          if (thread.locked) {
            res.showPage('notify/notify', {
              error: '主题已经锁定!'
            });
            return false;
          }
          var options = {
            thread: thread.id,
            content: extracted.body.content,
            author: user.id
          };
          if (extracted.body.parent) {
            options.parent = extracted.body.parent;
          }
          return Post.create(options).then(function (created) {
            post = created;
            var processes =
              [
                Thread.update(
                  {
                    id: thread.id
                  }, {
                    replies: thread.posts.length + 1,
                    lastReplier: user.id,
                    lastReplyAt: new Date()
                  }
                ),
                User.update(
                  {
                    id: user.id
                  }, {
                    score: Number(user.score - 0) + 5,
                    replies: Number(user.replies - 0) + 1
                  }
                ),
                new Promise(function (resolve) {
                  at.parse(req, post.content, {
                    sender: user,
                    replier: user,
                    thread: thread,
                    post: post
                  }, resolve);
                })
              ];
            if (extracted.body.parent) {
              processes.push(Post.findOne({
                id: extracted.body.parent
              }).populate('author').then(function (parent) {
                if (user.id !== parent.author.id) {
                  return Message.create({
                    sender: user.id,
                    receiver: parent.author.id,
                    type: 'reply2',
                    replier: user.id,
                    thread: thread.id,
                    post: parent.id
                  });
                }
              }));
            }
            if (user.id !== thread.author.id) {
              processes.push(Message.create({
                sender: user.id,
                receiver: thread.author.id,
                type: 'reply',
                replier: user.id,
                thread: thread.id,
                post: post.id
              }));
            }
            return Promise.all(processes).then(function () {
              res.redirect('/thread/visit/' + thread.id + '#post-' + post.id);
            });
          });
        }).fail(res.onError);
    }
  },
  policies: {
    all: isLogin
  },
  validations: {
    post: {
      required: ['params', 'body'],
      params: {
        id: {
          type: 'string',
          required: true
        }
      },
      body: {
        parent: {
          type: 'string'
        },
        content: {
          type: 'text',
          required: true
        }
      }
    }
  }
};
