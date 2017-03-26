/**
 * Forim - User Router
 * Copyright(c) 2016 calidion <calidion@gmail.com>
 * Apache 2.0 Licensed
 */

var _ = require('lodash');
var common = require('errorable-common');
var errorable = require('errorable');
var Generator = errorable.Generator;

common = _.merge(common, require('./friend'));
common = _.merge(common, require('./message'));
common = _.merge(common, require('./user'));
common = _.merge(common, require('./email'));
common = _.merge(common, require('./blocked'));
common = _.merge(common, require('./group'));
common = _.merge(common, require('./invitation'));
common = _.merge(common, require('./favorite'));
common = _.merge(common, require('./like'));
common = _.merge(common, require('./dislike'));
common = _.merge(common, require('./file'));

var errors = new Generator(common, 'zh-CN').errors;
module.exports = errors;
