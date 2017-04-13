var path = require('path');
var vig = require('vig');

var routers = require('./routers');
var errors = require('./errors');
var handlers = require('./handlers/');
var oauth = require('./oauth');

module.exports = function (config, app, cb) {
  oauth(app);
  var vmodel = new vig.VModel(__dirname);
  var verror = new vig.VError(__dirname);
  var vfile = new vig.VFile();
  var vservice = new vig.VService();

  vmodel.init(config, {
    connection: 'default'
  }, function (error, models) {
    if (error) {
      console.error('数据库出错,请检查你的配置！');
      console.error(error, config.connections);
      throw error;
    }
    vservice.attach(app);
    app.use(function (req, res, next) {
      req.models = models;
      res.onError = function (err) {
        console.error(err.stack);
        res.errorize(res.errors.Failure, err.stack ? err.stack : err);
      };
      next();
    });
    verror.merge(errors);
    verror.attach(app);
    vfile.attach(app);
    vservice.addHandlers(app, handlers);
    routers(app, models);
    cb(error, models);
  });
};
