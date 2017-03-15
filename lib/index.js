'use strict';
var config = require('./config');
var boot = require('./boot');
var realConfig = config.database.adapters.waterline.dev;
if (!module.parent) {
  if (process.env.NODE_ENV === 'production') {
    realConfig = config.database.adapters.waterline.prod;
  }
  boot(realConfig, function (server) {
    server.listen(config.site.server.port, config.site.server.ip, function () {
      console.log('Server listening on port', config.site.server.port);
      console.log('Visit http://' + config.site.server.ip + ':' + config.site.server.port);
    });
  });
}
