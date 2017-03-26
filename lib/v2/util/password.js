var bcrypt = require('bcryptjs');
var crypto = require('crypto');

var pass = {
  _getSalt: function (resolve, reject) {
    return function (err, salt) {
      if (err) {
        console.error(err, salt);
        reject(err, salt);
      } else {
        resolve(salt);
      }
    };
  },
  _hash: function (resolve, reject) {
    bcrypt.genSalt(10, pass._getSalt(resolve, reject));
  },
  hash: function () {
    return new Promise(pass._hash);
  },
  create: function (password, salt) {
    return crypto.createHash('md5').update(password + salt).digest('hex');
  },
  compare: function (password, salt, result) {
    return crypto.createHash('md5').update(password + salt).digest('hex') === result;
  },
  tokenize: function (str) {
    return crypto.createHash('md5').update(str).digest('hex');
  }
};

module.exports = pass;
