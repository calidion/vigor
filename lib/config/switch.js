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
  }
};
