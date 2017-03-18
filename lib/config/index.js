
var modules = ['site', 'database', 'oauth', 'dev', 'message', 'uploader', 'cache', 'switch'];
var config = {};
for (var i = 0; i < modules.length; i++) {
  config[modules[i]] = require('./' + modules[i]);
}

module.exports = config;
