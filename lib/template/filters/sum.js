module.exports = function (redbags) {
  var total = 0;
  for (var i = 0; i < redbags.length; i++) {
    total += (redbags[i].value - 0);
  }
  return total;
};
