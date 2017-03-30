module.exports = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.host);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, *');
  next();
};
