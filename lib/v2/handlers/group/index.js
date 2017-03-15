var modules = [];
var requires = ['create', 'update', 'remove', 'my', 'list', 'message', 'member'];
for (var i = 0; i < requires.length; i++) {
  modules = modules.concat(require('./' + requires[i]));
}
module.exports = modules;

