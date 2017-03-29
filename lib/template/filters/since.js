var moment = require('moment');
moment.locale('zh-cn');

module.exports = function (time) {
  if (!time) {
    return '';
  }
  var gap = new Date().getTime() - new Date(time).getTime();
  if (gap > 24 * 3600000) {
    return moment(time).format('YYYY年MM月DD日 HH:mm');
  }
  return moment(new Date(time)).fromNow();
};
