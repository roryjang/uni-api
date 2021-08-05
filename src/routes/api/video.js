const returnJSON = require('./json');
const router = require('koa-router')();
const axios = require('axios');
const userModel = require('../../model/user');

/**
 * 返回随机时间
 * @returns
 */
function getRandomTime() {
  return parseInt(Math.random() * 60);
}

/**
 * 视频列表
 */
router.get('/list', async (ctx, next) => {
  let json = { ...returnJSON };
  let { page, size } = ctx.query;
  if (!size) {
    size = 10;
  }
  // 进行线上请求
  const { data: res } = await axios({
    url: `https://haokan.baidu.com/web/video/feed?tab=yinyue_new&num=${size}`
  });
  json.data = {
    list: res.data.response.videos
  };
  ctx.body = json;
});

/**
 * 视频弹幕
 */
router.get('/danmu', async (ctx, next) => {
  let json = { ...returnJSON };
  let { videoId } = ctx.query;
  if (!videoId) {
    json.message = 'videoId 为必传项';
    json.success = false;
  } else {
    // 进行线上请求
    const { data: res } = await axios({
      url: `https://haokan.baidu.com/videoui/api/commentget?url_key=${videoId}&pn=1&rn=9999`
    });

    if (res.data.list) {
      res.data.list.forEach((item) => {
        delete item.reply_list;
        item.text = item.content;
        item.time = getRandomTime();
        item.userName = item.uname;
      });
    }
    json.data = res.data;
  }

  ctx.body = json;
});

/**
 * 视频评论列表
 */
router.get('/comment/list', async (ctx, next) => {
  let json = { ...returnJSON };
  let { videoId, page, size } = ctx.query;
  if (!videoId) {
    json.message = 'videoId 为必传项';
    json.success = false;
  } else {
    // 进行线上请求
    const { data: res } = await axios({
      url: `https://haokan.baidu.com/videoui/api/commentget?url_key=${videoId}&pn=${page}&rn=${size}`
    });

    if (res.data.list) {
      res.data.list.forEach((item) => {
        delete item.reply_list;
      });
    }
    json.data = res.data;
  }

  ctx.body = json;
});

module.exports = router.routes();
