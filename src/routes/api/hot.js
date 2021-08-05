const returnJSON = require('./json');
const router = require('koa-router')();
const hotTabs = require('../../model/hot-tabs');
const hotList = require('../../model/hot-list');
const { checkLength } = require('../../utils/validate');

/**
 * 获取热搜 tab
 */
router.get('/tabs', async (ctx, next) => {
  let json = { ...returnJSON };
  let result = await hotTabs.find();
  json.data = {
    list: result
  };
  ctx.body = json;
});

/**
 * 根据 tab 的 id 获取热搜数据
 */
router.get('/list', async (ctx, next) => {
  const { type } = ctx.query;
  let json = { ...returnJSON };
  let result = await hotList.find(
    {
      type
    },
    [
      'id',
      'type',
      'typeLabel',
      'avatar',
      'avatarurl',
      'shown_time',
      'summary',
      'desc',
      'nickname',
      'title',
      'created_at',
      'user_name',
      'views'
    ]
  );
  json.data = {
    list: result
  };
  ctx.body = json;
});
module.exports = router.routes();
