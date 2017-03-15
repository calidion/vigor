var util = require('util');
var sharable = require('../../sharable');
function onFailure(err, req, res) {
  res.showPage('notify/notify', {
    error: err
  });
}
module.exports = {
  urls: ['/user/page/:id'],
  routers: {
    get: function (req, res) {
      var User = req.models.User;
      var Thread = req.models.Thread;
      var Post = req.models.Post;
      var id = req.params.id;
      var options = {
        or:
        [{
          id: id
        }, {
          username: id
        }]
      };
      User.findOne(options).then(function (found) {
        if (!found) {
          return onFailure(res.errors.UserNotFound, req, res);
        }
        Promise.all([
          sharable.thread.userCreated(found, Thread),
          sharable.thread.userAttended(found, Thread, Post)
        ]).then(function (data) {
          res.showPage('user/page', {
            user: found,
            created: data[0],
            attended: data[1],
            title: util.format('@%s 的个人主页',
              found.username)
          });
        }).catch(function (error) {
          console.error(error);
          onFailure(error, req, res);
        });
      }).fail(function (error) {
        console.error(error);
        onFailure(error, req, res);
      });
    }
  },
  validations: {
    get: {
      params: {
        id: {
          type: 'string',
          maxLength: 32,
          minLength: 1,
          required: true
        }
      }
    }
  },
  failures: {
    validation: function (data, req, res) {
      console.error(data);
      onFailure('用户名错误!', req, res, req.body);
    }
  }
};
