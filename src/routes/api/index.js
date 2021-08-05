/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
const router = require('koa-router')();
const hot = require('./hot');
const search = require('./search');
const article = require('./article');
const sys = require('./sys');
const user = require('./user');
const video = require('./video');
const test = require('./test');

// 热搜
router.use('/hot', hot);
// 搜索
router.use('/search', search);
// 文章
router.use('/article', article);
// 用户信息
router.use('/sys', sys);
// 权限
router.use('/user', user);
// 视频
router.use('/video', video);
// 测试用接口
router.use('/test', test);
module.exports = router.routes();
