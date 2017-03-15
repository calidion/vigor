
module.exports = {
  urls: [
    '/oauth/github/create'
  ],
  routers: {
    get: function (req, res) {
      res.showPage('oauth/github/create', {
        actionPath: '/oauth/github/create'
      });
    }
  }
};

