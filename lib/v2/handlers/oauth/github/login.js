var passport = require('passport');
var config = require('../../../../config');
module.exports = {
  urls: [
    '/oauth/github/login', 'auth/github'
  ],
  routers: {
    get: passport.authenticate('github')
  },
  policies: {
    get: function (req, res, next) {
      if (!config.oauth.adapters.github.clientID) {
        return res.send('call the admin to set github oauth.');
      }
      if (req.query.url) {
        req.session.url = req.query.url;
      }
      next(true);
    }
  }
};

