var config = require('./config');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

module.exports = session({
  secret: config.site.auth.session.secret,
  store: new RedisStore(config.cache.adapters.redis),
  cookie: {
    secure: false
  },
  resave: false,
  saveUninitialized: false
});
