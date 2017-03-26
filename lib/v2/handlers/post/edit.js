var isPostAuthor = require('../../policies/isPostAuthor');

module.exports = {
  urls: [
    '/post/edit/:id'
  ],
  routers: {
    get: function (req, res) {
      res.showPage('post/edit', {
        post: req._post
      });
    },
    post: function (req, res) {
      var Post = req.models.Post;
      var extracted = req.extracted;
      var post = req._post;
      Post.update(
        {
          id: extracted.params.id
        }, {
          content: extracted.body.content
        }
      ).then(function () {
        res.redirect('/thread/visit/' + post.thread.id + '#post-' + post.id);
      }).fail(res.onError);
    }
  },
  policies: {
    all: isPostAuthor
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
        content: {
          type: 'text',
          required: true
        }
      }
    }
  }
};
