var config = require('../../../config');
var WeiXinPay = require('../../../src/weixin/pay').WeiXinPay;
var pay = new WeiXinPay(config.weixin);

module.exports = [{
  urls: ['weixin/pay/qrcode/callback'],
  routers: {
    all: function (req, res) {
      console.log(req.body, req.rawBody);
      pay.onNotify(config, req, res).then(function (data) {
        console.log('callback, passed');
        console.log(data);
      });
    }
  }
}];
