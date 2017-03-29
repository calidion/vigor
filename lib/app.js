var express = require('express');

var compress = require('compression');
var config = require('./config');
var session = require('./session');

// middlewares
var forcehttps = require('./middlewares/forcehttps');
var cors = require('./middlewares/cors');
var pages = require('./middlewares/pages');

var urlinfo = require('url').parse(config.site.host);
config.hostname = urlinfo.hostname || config.site.host;

var app = express();

app.enable('trust proxy 1');

// 静态文件目录
app.use('/statics', express.static(config.site.static.path));
app.use(require('cookie-parser')(config.site.auth.session.secret));
app.use(compress());
app.use(session);

if (config.site.https.enabled) {
  app.use(forcehttps);
}

app.use(cors);
app.use(pages);
module.exports = app;
