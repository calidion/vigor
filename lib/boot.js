'use strict';
var runner = require("http").Server;
var app = require('./app');
var v2 = require('./v2/');
var sio = require('./socket.io');
var server = runner(app);

module.exports = function (conf, cb) {
  v2(conf, app, function () {
    sio(server);
    cb(server);
  });
};
