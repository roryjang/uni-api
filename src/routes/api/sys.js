const returnJSON = require('./json');
const router = require('koa-router')();
const userModel = require('../../model/user');
const UUID = require('uuid');

router.post('/login', async (ctx, next) => {
  let json = { ...returnJSON };
  let body = ctx.request.body;

  if (!body.signature) {
    json.message = 'signature 为必传项';
    json.success = false;
  } else {
    // 查看当前用户是否存在
    const user = await userModel.findOne({ signature: body.signature });
    // 生成 token
    const token = 'Bearer ' + UUID.v4(); // 生成一个token

    if (user) {
      await userModel.updateOne({ signature: body.signature }, { ...body, token });
    } else {
      await userModel.create({ ...body, token });
      json.message = '登录成功';
      json.success = true;
    }
    json.data = {
      token
    };
  }

  ctx.body = json;
});

module.exports = router.routes();
