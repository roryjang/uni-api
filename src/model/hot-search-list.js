/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email shuiruohanyu@foxmail.com
 *
 */
var mongoose = require('mongoose');
// const sd = require('silly-datetime')
var schema = new mongoose.Schema({
  id: { type: String }, // id
  label: { type: String } // label
});
var hotTabs = mongoose.model('hotSearchList', schema, 'hotSearchList');

module.exports = hotTabs;
