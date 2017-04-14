module.exports = {
  app: {
    id: process.env.WEIXIN_APP_ID,
    secret: process.env.WEIXIN_APP_SECRET,
    token: process.env.WEIXIN_APP_TOKEN
  },
  message: {
    aes: process.env.WEIXIN_MESSAGE_AES
  },
  oauth: {
    state: process.env.WEIXIN_OAUTH_STATE || 'state',
    scope: process.env.WEIXIN_OAUTH_SCOPE || '0'
  },
  merchant: {
    id: process.env.WEIXIN_MERCHANT_ID,
    key: process.env.WEIXIN_MERCHANT_KEY
  },
  certificate: {
    pfxKey: process.env.WEIXIN_SSL_PFX_KEY,
    pfx: process.env.WEIXIN_SSL_PFX,
    path: process.env.WEIXIN_SSL_PATH
  }
};
