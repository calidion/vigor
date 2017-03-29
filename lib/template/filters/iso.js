var moment = require('moment');
moment.locale('zh-cn');

module.exports = function (time, format) {
  var str = moment(time).format(format || 'YYYY-MM-DD HH:mm:ss');
  return str;
};
