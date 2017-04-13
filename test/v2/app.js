var app = require('../../lib/app');
var v2 = require('../../lib/v2');
var config = require('../../lib/config');

var realConfig = config.database.adapters.waterline.dev;
var initialized = false;
var models;
module.exports = function (cb) {
  if (initialized) {
    return cb(app, models);
  }
  v2(realConfig, app, function (error, m) {
    models = m;
    cb(app, models);
    initialized = true;
  });
};

