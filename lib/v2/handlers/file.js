var config = require('../../config').uploader;
var isLogin = require('../policies/isLogin');
var uploader = require('file-cloud-uploader');

module.exports = [{
  urls: ['/file/upload'],
  routers: {
    post: function (req, res) {
      var File = req.models.File;
      var user = req.session.user;

      req.file('file').upload(function (err, files) {
        if (err) {
          return res.onError(res.errors.FileUploadingFailed);
        }
        var file = files[0];
        if (config.maxSize && file.size > config.maxSize) {
          return res.onError(res.errors.FileSizeLimitExceeded);
        }
        var type = config.default;
        var adapter = config.adapters[type];
        uploader(type, file.fd, adapter, function (result) {
          if (result.error) {
            return res.onError(res.errors.FileUploadingFailed);
          }
          File.create({
            user: user.id,
            url: result.url,
            filename: file.filename
          }).then(function () {
            res.errorize(res.errors.Success, {
              url: result.url
            });
          }).fail(res.onError);
        });
      });
    }
  },
  policies: {
    all: isLogin
  }
}];
