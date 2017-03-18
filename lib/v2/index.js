var path = require('path');
var vig = require('vig');

var routers = require('./routers');
var errors = require('./errors');
var handlers = require('./handlers/');
var oauth = require('./oauth');

module.exports = function (config, app, cb) {
  oauth(app);

  var dir = path.resolve(__dirname, './models/');
  vig.models.addDir(dir);
  vig.models.init(config, {
    connection: 'default'
  }, function (error, models) {
    if (error) {
      console.error('数据库出错,请检查你的配置！');
      console.error(error, config.connections);
      throw error;
    }
    app.use(function (req, res, next) {
      req.vig = vig;
      res.onError = function (err) {
        console.error(err.stack);
        res.errorize(res.errors.Failure, err.stack ? err.stack : err);
      };
      next();
    });
    vig._models = models;
    vig.init(app, errors);
    routers(app, models);
    app.models = models;
    vig.addHandlers(app, handlers);
    cb(error);
  });
};
