var isLogin = require('../../policies/isLogin');
var config = require('../../../config');
var WeiXinPay = require('../../../src/weixin/pay').WeiXinPay;
var pay = new WeiXinPay(config.weixin);
var qrcode = require('qrcode');

module.exports = {
  urls: [
    '/thread/redbag/:id'
  ],
  routers: {
    get: function (req, res) {
      var RedBagThread = req.models.RedBagThread;
      var extracted = req.extracted.params;
      RedBagThread.findOne(
        {
          id: extracted.id
        }
      ).populate('user').populate('thread').then(function (redbag) {
        if (!redbag) {
          return res.onPageError('此红包不存在或已被删除。');
        }
        console.log('get');
        var order = {
          title: '红包充值',
          no: redbag.id,
          price: redbag.value
        };
        var data = {};
        pay.qrPay(req, data, 'NATIVE', order);

        /* eslint dot-notation: ["error", { "allowPattern": "^[a-z]+(_[a-z]+)+$" }] */
        data['notify_url'] = process.env.FORIM_HOST + '/weixin/pay/qrcode/callback';
        if (process.env.LOCAL_IP) {
          data['spbill_create_ip'] = process.env.LOCAL_IP || '115.183.164.187';
        }
        pay.uniPay(config.weixin, data).then(function (uniData) {
          var qrString = uniData['code_url'];
          console.log(qrString);
          var opts = {
            errorCorrectionLevel: 'M',
            type: 'image/jpeg',
            rendererOpts: {
              quality: 0.3
            }
          };
          qrcode.toDataURL(qrString, opts, function (err, url) {
            if (err) {
              throw err;
            }
            res.showPage('thread/redbag', {
              redbag: redbag,
              url: url
            });
          });
        });
      }).fail(res.onError);
    }
  },
  policies: {
    all: isLogin
  },
  validations: {
    get: {
      params: {
        id: {
          type: 'string',
          required: true
        }
      }
    },
    post: {
      required: ['body'],
      params: {
        id: {
          type: 'string',
          required: true
        }
      },
      body: {
        value: {
          type: 'int',
          required: true
        }
      }
    }
  }
};
