var site = require('./site');

module.exports = {
  enables: [
    'github'
    // , 'twitter', 'facebook', 'google', 'weibo', 'weixin', 'qq'
  ],
  adapters: {
    weixin: {
    },
    qq: {

    },
    facebook: {

    },

    weibo: {
      key: process.env.FORIM_WEIBO_KEY,
      id: process.env.FORIM_WEIBO_ID
    },
    github: {
      clientID: process.env.FORIM_GITHUB_CLIENT_ID,
      clientSecret: process.env.FORIM_GITHUB_CLIENT_SECRET,
      callbackURL: process.env.FORIM_GITHUB_CALLBACK_URL || 'http://' + site.host + '/oauth/github/callback',
      scope: ['user:email']
    },
    google: {

    }
  }
};
