const returnJSON = require('./json');
const router = require('koa-router')();
const userModel = require('../../model/user');
const UUID = require('uuid');

/**
 * 关注用户
 */
router.get('/follow', async (ctx, next) => {
  let json = { ...returnJSON };
  let { author, isFollow } = ctx.query;
  let { authorization } = ctx.request.header;

  if (!author || !isFollow) {
    json.message = 'author || isFollow 为必传项';
    json.success = false;
  } else {
    const user = await userModel.findOne({ token: authorization });
    if (!user) {
      json.message = 'token 异常，请重新登录！';
      json.success = false;
    } else {
      let isExist = false;
      user.follows.forEach((item) => {
        if (item.author === author) {
          item.isFollow = isFollow;
          isExist = true;
        }
      });
      if (!isExist) {
        user.follows.push({ author, isFollow });
      }
      const { err } = await userModel.updateOne(
        { token: authorization },
        { follows: user.follows }
      );
    }
  }

  ctx.body = json;
});

/**
 * 文章点赞
 */
router.get('/praise', async (ctx, next) => {
  let json = { ...returnJSON };
  let { articleId, isPraise } = ctx.query;
  let { authorization } = ctx.request.header;

  if (!articleId || !isPraise) {
    json.message = 'articleId || isPraise 为必传项';
    json.success = false;
  } else {
    const user = await userModel.findOne({ token: authorization });
    if (!user) {
      json.message = 'token 异常，请重新登录！';
      json.success = false;
    } else {
      let isExist = false;
      user.praises.forEach((item) => {
        if (item.articleId === articleId) {
          item.isPraise = isPraise;
          isExist = true;
        }
      });
      if (!isExist) {
        user.praises.push({ articleId, isPraise });
      }
      const { err } = await userModel.updateOne(
        { token: authorization },
        { praises: user.praises }
      );
    }
  }

  ctx.body = json;
});

/**
 * 文章收藏
 */
router.get('/collect', async (ctx, next) => {
  let json = { ...returnJSON };
  let { articleId, isCollect } = ctx.query;
  let { authorization } = ctx.request.header;

  if (!articleId || !isCollect) {
    json.message = 'articleId || isCollect 为必传项';
    json.success = false;
  } else {
    const user = await userModel.findOne({ token: authorization });
    if (!user) {
      json.message = 'token 异常，请重新登录！';
      json.success = false;
    } else {
      let isExist = false;
      user.collects.forEach((item) => {
        if (item.articleId === articleId) {
          item.isCollect = isCollect;
          isExist = true;
        }
      });
      if (!isExist) {
        user.collects.push({ articleId, isCollect });
      }
      const { err } = await userModel.updateOne(
        { token: authorization },
        { collects: user.collects }
      );
    }
  }

  ctx.body = json;
});

/**
 * 发布文章评论
 */
router.post('/article/comment', async (ctx, next) => {
  let json = { ...returnJSON };
  let { articleId, content } = ctx.request.body;
  let { authorization } = ctx.request.header;

  if (!articleId || !content) {
    json.message = 'articleId || content 为必传项';
    json.success = false;
  } else {
    const user = await userModel.findOne({ token: authorization });
    if (!user) {
      json.message = 'token 异常，请重新登录！';
      json.success = false;
    } else {
      json.data = {
        info: {
          commentId: UUID.v4(),
          articleId,
          content,
          nickName: user.nickName,
          userName: user.nickName,
          avatar: user.avatarUrl,
          digg: 0,
          postTime: new Date(),
          date: new Date()
        }
      };
    }
  }

  ctx.body = json;
});

module.exports = router.routes();
