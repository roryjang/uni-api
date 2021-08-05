const returnJSON = require('./json');
const router = require('koa-router')();
const request = require('../../utils/request');
const hotSearchList = require('../../model/hot-search-list');

/**
 * search 搜索
 */
router.get('/', async (ctx, next) => {
  let json = { ...returnJSON };
  let { q, p } = ctx.query;
  // 进行线上请求
  const { result_vos } = await request({
    url: '/api/v1/search',
    params: {
      q,
      p
    }
  });
  let result = [];
  if (result_vos && result_vos.length > 0) {
    result = result_vos.map((item) => {
      return {
        pic: item.pic,
        type: item.type,
        body: item.body,
        author_label: item.author_label,
        id: item.id,
        blogId: item.blogId,
        create_time: item.create_time,
        level: item.level,
        author: item.author,
        author_id: item.author_id,
        description: item.description,
        created_at: item.created_at,
        title: item.title,
        nickname: item.nickname,
        digest: item.digest,
        updateTime: item.updateTime,
        url: item.url,
        create_time_str: item.create_time_str,
        pic_list: item.pic_list
      };
    });
  }
  json.data = {
    list: result
  };
  ctx.body = json;
});

/**
 * 热搜搜索列表
 */
router.get('/hot-list', async (ctx, next) => {
  let json = { ...returnJSON };
  let result = await hotSearchList.find();
  json.data = {
    list: result
  };
  ctx.body = json;
});

/**
 * 返回默认搜索内容
 */
router.get('/default-text', async (ctx, next) => {
  const searchTexts = [
    'uniapp',
    '前端',
    '前后端分离',
    'source map',
    '程序员的反击',
    '基于 vue-element-admin 的前端项目',
    '浅谈前端八大UI库',
    'Vue 3 深入响应式原理',
    'CTO写低级Bug',
    '大厂薪资级别大比拼',
    '大厂面试经验总结',
    'vue-element-admin'
  ];
  let json = { ...returnJSON };
  json.data = {
    defaultText: searchTexts[parseInt(Math.random() * searchTexts.length)]
  };
  ctx.body = json;
});

module.exports = router.routes();
