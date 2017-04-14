var paginator = require('waterline-paginator');
var validator = require('node-form-validator');
module.exports = [{
  urls: ['/weixin/pay/callback'],
  routers: {
    get: function (req, res) {
      var id = req.params.id;
      var Settings = req.models.Settings;
      Settings.findOne({
        id: id
      }).then(function (settings) {
        if (!settings) {
          return res.errorize(res.errors.NotFound);
        }
        res.errorize(res.errors.Success, settings);
      }).fail(callbacks.failed(res));
    }
  },
  policies: {
    all: isAdmin
  }
}];
