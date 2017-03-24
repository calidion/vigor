var config = require('../../../config');
var password = require('../../util/password');
var image = require('../../util/image');
var uuid = require('node-uuid');
var mailer = require('../../util/mailer');

function onFailure(err, req, res, data) {
  res.status(422);
  res.showPage('user/register', {
    error: err,
    username: data.username,
    email: data.email
  });
}
module.exports = {
  urls: ['/user/register'],
  routers: {
    get: function (req, res) {
      if (config.site.client.register.enabled) {
        res.showPage('user/register');
      } else {
        res.redirect('/oauth/github/login');
      }
    },
    post: function (req, res) {
      var User = req.models.User;
      var extracted = req.extracted.body;
      var user = {
        password: extracted.password,
        email: extracted.email,
        username: extracted.username,
        nickname: extracted.username
      };
      var ors = [{
        username: extracted.username
      }];

      if (extracted.email) {
        ors.push({
          email: extracted.email
        });
      }
      User.findOne({
        or: ors
      }).then(function (found) {
        if (found) {
          return onFailure(res.errors.UserExisted.message, req, res, user);
        }
        return password.hash().then(function (salt) {
          user.salt = salt;
          user.password = password.create(extracted.password, salt);
          user.avatar = image.makeAvatar(extracted.email || extracted.username);
          if (config.switch.registration.validation.email === 'true') {
            user.active = false;
          } else {
            user.active = true;
          }
          user.accessToken = password.tokenize(String(uuid.v4()));
          return User.create(user);
        }).then(function (created) {
          if (created.email && config.switch.registration.validation.email === 'true') {
            return new Promise(function (resolve, reject) {
              mailer.user.activate(created.email, created.accessToken, created.username, function (error) {
                if (error) {
                  return reject(error);
                }
                resolve(created);
              });
            });
          }
          return created;
        }).then(function () {
          var success = '注册成功，欢迎加入 ' + config.site.name + '！';
          if (config.switch.registration.validation.email === 'true') {
            success += '我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。';
          } else {
            success += "现在你就可以通过下面的对话框登录了！";
          }
          res.showPage('user/login', {
            success: success
          });
        });
      }).fail(function (err) {
        onFailure(err, req, res, req.body);
      });
    }
  },
  validations: {
    post: {
      body: {
        username: {
          type: 'string',
          maxLength: 32,
          minLength: 2,
          required: true
        },
        email: {
          type: 'email'
        },
        password: {
          type: 'string',
          maxLength: 64,
          minLength: 4,
          required: true
        },
        confirm: {
          matches: 'password'
        }
      }
    }
  },
  faulures: {
    validation: function (err, req, res) {
      onFailure(err.data, req, res, req.body);
    }
  }
};
