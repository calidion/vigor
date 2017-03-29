var utility = require('utility');
module.exports = {
  makeAvatar: function (name) {
    return 'https://www.gravatar.com/avatar/' + utility.md5(name) + '?size=48';
  }
};
