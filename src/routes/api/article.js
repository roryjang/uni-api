const returnJSON = require('./json');
const router = require('koa-router')();
const axios = require('axios');
const userModel = require('../../model/user');

/**
 * 文章详情
 */
router.get('/details', async (ctx, next) => {
  let json = { ...returnJSON };
  let { author, articleId } = ctx.query;
  let { authorization } = ctx.request.header;
  let user = null;
  // 判断是否登录
  if (authorization) {
    user = await userModel.findOne({ token: authorization });
  }
  // 进行线上请求
  const res = await axios({
    url: `https://blog.csdn.net/${author}/article/details/${articleId}`
  });
  const dataStr = res.data.toString();
  const result = {
    articleId: articleId,
    title: /\<title\>(.*)\<\/title\>/.exec(dataStr)[1],
    date: /\<span class="time"\>(.*)\<\/span\>/.exec(dataStr)[1],
    // \s+ 匹配一个或多个 空格
    // nickName: /var nickName = "(.*)";/.exec(dataStr)[1],
    nickName: /var\s+nickName =\s+"(.*)";/.exec(dataStr)[1],
    username: /var\s+username =\s+"(.*)";/.exec(dataStr)[1],
    articleTitle: /var\s+articleTitle =\s+"(.*)";/.exec(dataStr)[1],
    avatar: /var\s+avatar =\s+"(.*)";/.exec(dataStr)[1],
    articleDesc: /var\s+articleDesc\s=\s+"(.*)";/.exec(dataStr)[1],
    articleTitles: /var\s+articleTitles\s=\s+"(.*)";/.exec(dataStr)[1],
    content: /\<article class="baidu_pl"\>(.*)\<\/article\>/s.exec(dataStr)[1],
    isFollow:
      user &&
      user.follows &&
      user.follows.filter((item) => item.author === author && item.isFollow.bool()).length > 0
        ? true
        : false,
    isPraise:
      user &&
      user.praises &&
      user.praises.filter((item) => item.articleId === articleId && item.isPraise.bool()).length > 0
        ? true
        : false,
    isCollect:
      user &&
      user.collects &&
      user.collects.filter((item) => item.articleId === articleId && item.isCollect.bool()).length >
        0
        ? true
        : false
  };
  json.data = {
    data: result
  };
  ctx.body = json;
});

/**
 * 文章评论
 */
router.get('/comment/list', async (ctx, next) => {
  let json = { ...returnJSON };
  let { articleId, page, size } = ctx.query;
  if (!articleId || !page) {
    json.message = 'articleId || page 为必传项';
    json.success = false;
  } else {
    if (!size) size = 10;
    // 进行线上请求
    const { data: res } = await axios({
      url: `https://blog.csdn.net/phoenix/web/v1/comment/list/${articleId}?page=${page}&size=${size}`
    });

    const data = res.data;

    data.list.forEach((item) => {
      delete item.sub;
      delete item.dateFormat;
      item.date = new Date(item.postTime);
    });

    json.data = {
      count: data.floorCount,
      pageCount: data.pageCount,
      list: data.list
    };
  }

  ctx.body = json;
});

/**
 * 临时接口
 */
router.get('/index', async (ctx, next) => {
  let json = { ...returnJSON };
  json.data = false;
  ctx.body = json;
});

module.exports = router.routes();
