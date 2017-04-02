var isThreadAuthor = require('../../policies/isThreadAuthor');

module.exports = {
  urls: [
    '/thread/pay/:id'
  ],
  routers: {
    get: function (req, res) {
      var Thread = req.models.Thread;
      var extracted = req.extracted.params;
      Thread.findOne(
        {
          id: extracted.id
        }
      ).then(function (thread) {
        res.showPage('thread/pay', {
          thread: thread
        });
      }).fail(res.onError);
    },
    post: function (req, res) {
      var user = req.session.user;
      var RedBagThread = req.models.RedBagThread;
      var params = req.extracted.params;
      var body = req.extracted.body;
      console.log(req.extracted);
      console.log(req.body);
      RedBagThread.create({
        user: user,
        thread: params.id,
        value: body.value
      })
        .then(function (created) {
          res.redirect('/thread/redbag/' + created.id);
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
      required: ['body'],
      params: {
        id: {
          type: 'string',
          required: true
        }
      },
      body: {
        value: {
          type: 'int',
          required: true
        }
      }
    }
  }
};
