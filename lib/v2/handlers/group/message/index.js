var modules = [];
// var requires = ['send', 'remove', 'list', 'breath'];
var requires = ['send', 'list'];
for (var i = 0; i < requires.length; i++) {
  modules = modules.concat(require('./' + requires[i]));
}
module.exports = modules;

