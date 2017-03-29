var requires = ['message', 'oauth', 'password',
  'search', 'settings', 'thread', 'user',
  'file', 'post', 'site', 'github', 'friend', 'group'];
var modules = [
  {
    prefix: '/.well-known/acme-challenge',
    urls: ['/:key'],
    routers: {
      get: function (req, res) {
        var text = process.env.FORIM_LETSENC_VALUE || 'disenU6J9zZ9ulP-mHVOTS0iWGENkKSNHaOYHoMWb4g.cM5_zdC1o-_Wf3sL8t1wsxYF6i0Twa54fd9IxcJJPYo';
        res.send(text);
      }
    }
  }
];
for (var i = 0; i < requires.length; i++) {
  modules = modules.concat(require('./' + requires[i]));
}
module.exports = modules;
