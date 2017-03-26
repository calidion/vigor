module.exports = function (data, req, res) {
  console.error(data);
  res.onPageError('输入不正确!', req, res);
};
