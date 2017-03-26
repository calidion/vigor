var isLogin = require('../../policies/isLogin');
var notLogin = require('../../failures/notLogin');
var wrongInput = require('../../failures/wrongInput');

module.exports = {
  urls: [
    '/thread/unfavorite'
  ],
  routers: {
    post: function (req, res) {
      var Thread = req.models.Thread;
      var User = req.models.User;
      var Favorite = req.models.Favorite;
      var user = req.session.user;
      var extracted = req.extracted.body;

      Thread.findOne({
        id: extracted.id
      }).then(function (thread) {
        if (!thread) {
          return res.json({
            status: 'failed'
          });
        }
        Favorite.destroy({
          owner: user.id,
          thread: thread.id
        }).then(function () {
          user.favoriteThreads--;
          thread.favorites--;
          Promise.all(
            [
              User.update(
                {
                  id: user.id
                }, {
                  favoriteThreads: user.favoriteThreads
                }
              ),
              Thread.update(
                {
                  id: thread.id
                }, {
                  favorites: thread.favorites
                }
              )
            ]
          ).then(function () {
            res.json({
              status: 'success'
            });
          }).catch(function (err) {
            console.error(err);
          });
        });
      }).fail(function (err) {
        console.error(err);
        return res.json({
          status: 'failed'
        });
      });
    }
  },
  policies: {
    all: isLogin
  },
  validations: {
    post: {
      body: {
        id: {
          type: 'string',
          required: true
        }
      }
    }
  },
  failures: {
    policy: notLogin,
    validation: wrongInput
  }
};
