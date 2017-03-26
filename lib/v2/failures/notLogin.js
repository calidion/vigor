module.exports = function (data, req, res) {
  console.error(data);
  res.onError('你尚未登录!', req, res);
};
