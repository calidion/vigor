var modules = [];
var requires = ['ack', 'invite', 'list'];
for (var i = 0; i < requires.length; i++) {
  modules = modules.concat(require('./' + requires[i]));
}
module.exports = modules;

