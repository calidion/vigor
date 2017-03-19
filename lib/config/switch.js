module.exports = {
  oauth: {
    on: process.env.FORIM_OAUTH_ON || 'false',
    github: process.env.FORIM_OAUTH_GITHUB || 'false'
  },
  registration: {
    on: process.env.FORIM_REGISTRATION_ON || 'false',
    validation: {
      email: process.env.FORIM_REGISTRATION_VALIDATION_EMAIL || 'false'
    }
  },
  chat: process.env.FORIM_CHAT_ON || 'false',
  tip: process.env.FORIM_TIP_ON || 'false',
  pay: process.env.FORIM_PAY_ON || 'false'
};
