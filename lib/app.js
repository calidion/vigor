var express = require('express');

var compress = require('compression');
var path = require('path');
var config = require('./config');
var session = require('./session');
var markdown = require('./markdown');
var nunjucks = require('nunjucks');

var moment = require('moment');
moment.locale('zh-cn');

var urlinfo = require('url').parse(config.site.host);
config.hostname = urlinfo.hostname || config.site.host;

var app = express();

app.enable('trust proxy 1');

// 静态文件目录
app.use('/statics', express.static(config.site.static.path));
app.use(require('cookie-parser')(config.site.auth.session.secret));
app.use(compress());
app.use(session);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, *');

  res.showPage = function (template, data) {
    var realPath = path.resolve(__dirname, 'v2/views/site');
    var loader = new nunjucks.FileSystemLoader(realPath);
    var env = new nunjucks.Environment(loader, {
      autoescape: false
    });
    env.addFilter('iso', function (time, format) {
      var str = moment(time).format(format || 'YYYY-MM-DD HH:mm:ss');
      return str;
    });
    env.addFilter('category', function (cat) {
      for (var i = 0; i < config.site.tabs.length; i++) {
        var tab = config.site.tabs[i];
        if (tab[0] === cat) {
          return tab[1];
        }
      }
      return '分享';
    });

    env.addFilter('since', function (time) {
      if (!time) {
        return '';
      }
      var gap = new Date().getTime() - new Date(time).getTime();
      if (gap > 24 * 3600000) {
        return moment(time).format('YYYY年MM月DD日 HH:mm');
      }
      return moment(new Date(time)).fromNow();
    });

    env.addFilter('markdown', markdown);

    if (!data) {
      data = {};
    }
    data.currentUser = null;
    if (req.session.user) {
      var user = {};
      for (var k in req.models.User.attributes) {
        if (typeof k === 'string') {
          user[k] = req.session.user[k];
        }
      }
      data.currentUser = user;
    }
    data.config = config;
    data.csrf = req.crsfToken ? req.csrfToken() : '';
    data.markdown = markdown;
    var html = env.render(template + '.html', data);
    res.send(html);
  };
  next();
});
module.exports = app;
