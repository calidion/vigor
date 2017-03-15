module.exports = {
  default: 'redis',
  adapters: {
    // redis 配置，默认是本地
    redis: {
      host: process.env.FORIM_REDIS_HOST || '127.0.0.1',
      port: (process.env.FORIM_REDIS_PORT - 0) || 6379,
      db: (process.env.FORIM_REDIS_DB - 0) || 0,
      password: process.env.FORIM_REDIS_PASSWORD || ''
    }
  }
};
