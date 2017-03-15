module.exports = function (err, req, res) {
  console.error(err);
  req.session.url = req.url;
  res.redirect('/oauth/github/login');
};
