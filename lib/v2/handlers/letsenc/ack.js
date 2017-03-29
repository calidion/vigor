module.exports = {
  prefix: '/.well-known/acme-challenge',
  urls: ['/:key'],
  routers: {
    get: function (req, res) {
      var LetsEnc = req.models.LetsEnc;
      LetsEnc.findOne({
        key: req.params.key
      }).then(function (found) {
        if (!found) {
          return res.errorize(res.errors.NotFound);
        }
        res.send(found.value);
      });
    }
  },
  validations: {
    get: {
      params: {
        key: {
          type: 'string',
          required: true
        }
      }
    }
  }
};
