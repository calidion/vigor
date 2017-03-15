module.exports = {
  debug: {
    switchOn: process.env.FORIM_DEBUG || true,
    log: {
      log4js: {
        appenders: [
          {
            type: 'console',
            category: 'cheese'
            // }, {
            //   type: 'file',
            //   filename: path.resolve(__dirname, process.env.FORIM_LOG_FILE || './logs/cheese.log'),
            //   category: 'cheese',
            //   maxLogSize: process.env.FORIM_LOG_SIZE || 20480,
            //   backups: process.env.FORIM_LOG_BACKUPS || 2
          }
        ]
      }
    }
  }
};
