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
  comments: { type: String },
  avatarurl: { type: String },
  user_name: { type: String },
  recommend_type: { type: String },
  created_at: { type: String },
  focus: { type: Boolean },
  digg: { type: String },
  recommend: { type: String },
  title: { type: String },
  url: { type: String },
  tags: { type: Array, default: [] },
  product_type: { type: String },
  report_data: { type: Object },
  product_id: { type: String },
  nickname: { type: String },
  style: { type: String },
  views: { type: String },
  desc: { type: String },
  id: { type: String },
  type: { type: String },
  category_id: { type: String },
  category: { type: String },
  isPlan: { type: String },
  strategy_id: { type: String },
  strategy: { type: String },
  tace_code: { type: String },
  shown_time: { type: String },
  user_url: { type: String },
  avatar: { type: String },
  typeLabel: { type: String }
});
var hotTabs = mongoose.model('hotList', schema, 'hotList');

module.exports = hotTabs;
