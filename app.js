/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
String.prototype.bool = function () {
  return /^true$/i.test(this);
};

const Koa = require('koa'),
  Router = require('koa-router'),
  Static = require('koa-static'),
  Session = require('koa-session'),
  cors = require('koa2-cors'),
  BodyParser = require('koa-bodyparser'),
  path = require('path'),
  compress = require('koa-compress'),
  jsonp = require('koa-jsonp');
api = require('./src/routes/api'); // 后端接口
(url = require('url')), require('./src/model/db'); // 引入数据库

// 初始化web服务
const app = new Koa();
const router = new Router();
// 配置跨域
app.use(cors());
//配置session
app.keys = ['some secret sunday'];
app.use(
  Session(
    {
      key: 'koa:sess',
      maxAge: 0,
      overwrite: true,
      httpOnly: true,
      signed: true,
      rolling: true,
      renew: true
    },
    app
  )
);
//配置静态资源
app.use(Static(path.join(__dirname, 'public')));
app.use(Static(path.join(__dirname, 'statics')));
//配置post请求数据接收
app.use(BodyParser());
//jsonp
app.use(jsonp());

//gzip
app.use(
  compress({
    filter: function (content_type) {
      return true;
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
  })
);

/**
 * 全局配置
 */
router.use(async (ctx, next) => {
  var pathname = url.parse(ctx.url).pathname;
  if (pathname.indexOf('user') === -1) {
    // 非 user 接口直接放过
    await next();
  } else {
    let { authorization } = ctx.request.header;

    if (authorization) {
      try {
        await next();
      } catch (error) {
        // ctx.status = 505
        ctx.body = {
          message: '程序执行遇到异常！异常信息：' + error.message,
          success: false,
          code: 10003,
          data: null
        };
      }
    }
  }
});

// 启动入口
router.get('/', async (ctx) => {
  ctx.body = '欢迎访问 imooc-blog';
});
router.use('/api', api);

app.use(router.routes());
//启动路由
app.use(router.allowedMethods());
//启动服务器
app.listen(3002, (err) => {
  console.log('接口启动：http://localhost:3002');
});
