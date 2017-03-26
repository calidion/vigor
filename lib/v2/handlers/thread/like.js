var isLogin = require('../../policies/isLogin');
var like = require('../../logics/thread/like');
var notLogin = require('../../failures/notLogin');
var wrongInput = require('../../failures/wrongInput');

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
