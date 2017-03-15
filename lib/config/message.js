module.exports = {
  adapters: {
    email: {
      host: process.env.FORIM_MAIL_HOST,
      port: process.env.FORIM_MAIL_PORT,
      password: process.env.FORIM_MAIL_PASSWORD,
      email: process.env.FORIM_MAIL_EMAIL,
      secure: process.env.FORIM_MAIL_SECURE || true, // use SSL
      auth: {
        user: process.env.FORIM_MAIL_USER || process.env.FORIM_MAIL_EMAIL,
        pass: process.env.FORIM_MAIL_PASSWORD
      }
    }
  }
};
