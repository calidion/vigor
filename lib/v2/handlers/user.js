var modules = [];
var requires = ['activate', 'block', 'list', 'login', 'logout',
  'page', 'profile', 'register', 'settings', 'star', 'top',
  'clear', 'detail', 'search'];
for (var i = 0; i < requires.length; i++) {
  modules = modules.concat(require('./user/' + requires[i]));
}
module.exports = modules;

