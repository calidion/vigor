var config = require('../../config');

module.exports = function (cat) {
  for (var i = 0; i < config.site.tabs.length; i++) {
    var tab = config.site.tabs[i];
    if (tab[0] === cat) {
      return tab[1];
    }
  }
  return '分享';
};
