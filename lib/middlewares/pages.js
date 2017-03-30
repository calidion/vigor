var path = require('path');
var config = require('../config');
var nunjucks = require('nunjucks');

// filters
var since = require('../template/filters/since');
var iso = require('../template/filters/iso');
var urlencode = require('../template/filters/urlencode');

var category = require('../template/filters/category');
var markdown = require('../template/filters/markdown');

var realPath = path.resolve(__dirname, '../v2/views/site');
var loader = new nunjucks.FileSystemLoader(realPath);
var env = new nunjucks.Environment(loader, {
  autoescape: false
});

env.addFilter('iso', iso);
env.addFilter('urlencode', urlencode);
env.addFilter('category', category);
env.addFilter('since', since);
env.addFilter('markdown', markdown);

module.exports = function (req, res, next) {
  res.onPageError = function (err) {
    return res.showPage('notify/notify', {
      error: err
    });
  };

  res.showPage = function (template, data) {
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
    var html = env.render(template + '.html', data);
    res.send(html);
  };
  next();
};
