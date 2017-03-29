var Markdown = require('markdown-it');
var md = new Markdown();
md.set({
  html: true,
  xhtmlOut: false,
  breaks: false,
  linkify: true,
  typographer: true
});

module.exports = function (text) {
  return md.render(text || '');
};
