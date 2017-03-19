var path = require('path');
var title = '';
var fullname = '';
var host = 'server.xiv.im';

module.exports = {
  name: fullname,
  title: process.env.FORIM_TITLE || title,
  description: process.env.FORIM_DESCRIPTION || '', // 社区的描述
  keywords: process.env.FORIM_KEYWORDS || '',
  logo: '',
  favicon: '',
  meta: {
    author: 'admin@domain.com'
  },
  tabs: [
    ['share', '分享'],
    ['water', '其它'],
    ['question', '问题'],
    ['projects', '项目']
  ],
  cors: {
    allowed: process.env.FORIM_CORS_DOMAIN || 'xiv.im:* im.t1bao.com:* local.xiv.im:* secure.xiv.im:*'
  },
  auth: {
    session: {
      secret: process.env.FORIM_SESSION_SECRET || 'secret' // 务必修改
    },
    cookie: {
      name: process.env.FORIM_COOKIE_NAME || 'cookie'
    }
  },
  host: host,
  server: {
    name: host,
    host: [process.env.FORIM_HOST || host],
    ip: process.env.OPENSHIFT_NODEJS_IP || process.env.NODE_IP || process.env.FORIM_HOST || '0.0.0.0',
    port: process.env.OPENSHIFT_NODEJS_PORT || process.env.NODE_PORT || process.env.FORIM_PORT || 8101
  },
  static: {
    path: path.resolve(__dirname, process.env.FORIM_STATIC_PATH || '../../public'),
    host: process.env.FORIM_STATIC_HOST
  },
  client: {
    register: {
      enabled: process.env.FORIM_REGISTRATION_ENABLED === undefined || true
    },
    web: {
      name: 'xiv.im',
      host: process.env.FORIM_IM_SITE || 'http://xiv.im'
    },
    rss: {
      title: process.env.FORIM_RSS_TITLE || title,
      link: process.env.FORIM_RSS_LINK || '',
      language: process.env.FORIM_RSS_LANGUAGE || 'zh-cn',
      description: process.env.FORIM_RSS_DESCRIPTION || '',
      // 最多获取的RSS Item数量
      max: process.env.FORIM_RSS_LIMIT || 50
    }
  },
  business: {
    selfVotable: process.env.FORIM_SELF_VOTE || false
  },
  pagination: {
    normal: 50,
    friend: 50,
    group: 50,
    post: 30,
    message: 50
  },
  limits: {
    visit: 1000,
    reply: 100,
    post: 50
  },
  analytics: {
    default: ['google'],
    adapters: {
      google: {
        id: process.env.FORIM_GOOGLE_TRACKER_ID || 'UA-71248969-2'
      },
      cnzz: {
        id: process.env.FORIM_CNZZ_TRACKER_ID || ''
      }
    }
  }
};
