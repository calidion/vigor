var isLogin = require('../../policies/isLogin');
var like = require('../../logics/thread/like');

module.exports = {
  urls: [
    '/thread/:action/:id'
  ],
  routers: {
    post: like
  },
  policies: {
    post: isLogin
  },
  validations: {
    post: {
      params: {
        action: {
          type: 'string',
          required: true
        },
        id: {
          type: 'int',
          required: true
        }
      }
    }
  },
  failures: {
    policy: function (data, req, res) {
      console.error(data);
      res.onError('你尚未登录!', req, res);
    },
    validation: function (data, req, res) {
      console.error(data);
      res.onError('输入不正确!', req, res);
    }
  }
};
