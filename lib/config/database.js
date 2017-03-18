var mysqlConf = {
  adapter: 'mysql',
  host: process.env.FORIM_MYSQL_DB_HOST || process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
  port: process.env.FORIM_MYSQL_DB_PORT || process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
  user: process.env.FORIM_MYSQL_DB_USER || process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'forim',
  password: process.env.FORIM_MYSQL_DB_PASSWORD || process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'forim',
  database: process.env.FORIM_MYSQL_DB_NAME || process.env.OPENSHIFT_APP_NAME || 'forim',
  prefix: process.env.FORIM_MYSQL_DB_PREFIX || ''
};

var mongoConf = {
  adapter: 'mongo',
  url: process.env.FORIM_MONGO_DB_URI || 'mongodb://127.0.0.1:27017/forim'
};
var mongoAdapter = require('sails-mongo');
var mysqlAdapter = require('sails-mysql');

var connections = {
  mysql: mysqlConf,
  mongo: mongoConf
};

var dbArray = ['mongo', 'mysql'];
var idx = 0;
if (process.env.FORIM_DATABASE_CONNECTION > 0) {
  idx = process.env.FORIM_DATABASE_CONNECTION % 2;
}
var db = connections[dbArray[idx]];
module.exports = {
  default: 'waterline',
  adapters: {
    waterline: {
      prod: {
        adapters: {
          mongo: mongoAdapter,
          mysql: mysqlAdapter
        },
        connections: {
          default: db
        },
        defaults: {
          migrate: process.env.FORIM_DATABASE_MIGRATE || 'alter'
        }
      },
      dev: {
        adapters: {
          mongo: mongoAdapter,
          mysql: mysqlAdapter
        },
        connections: {
          default: db
        }
      },
      defaults: {
        migrate: process.env.FORIM_DATABASE_MIGRATE || 'alter'
      }
    }
  }
};
