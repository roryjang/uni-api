const returnJSON = require('./json');
const router = require('koa-router')();
const listData = [
  {
    title: '用 JavaScript 实现手势库 — 手势逻辑【前端组件化】'
  },
  {
    title: '285页解析百度、阿里、腾讯前端面试题，通关秘籍请收好！'
  },
  {
    title: '跪在一面：回答字节跳动前端面试8道题，就像跟坐过山车样刺激！'
  },
  {
    title: '绝了！小说建站项目完整开源'
  },
  {
    title: 'JavaScript数据结构与算法 - 树'
  },
  {
    title: 'Vue知识（一）Vue基础语法'
  },
  {
    title: '面试题-JavaScript'
  },
  {
    title: '用户登录功能的实现'
  },
  {
    title: '基于javascript扫雷小游戏，以前上学经常玩'
  },
  {
    title: 'Vue开发网站seo优化方法'
  },
  {
    title: '搞定javascript内存泄漏'
  },
  {
    title: 'java实现10种排序算法'
  },
  {
    title: '第一次 PCB 打样'
  },
  {
    title: '程序员五一被拉去相亲，结果彻底搞懂了HTTP常用状态码'
  },
  {
    title: '大学生怎样在毕业时就能挑一个喜欢的大厂去拧螺丝？我Set了，你Get了吗？'
  },
  {
    title: '“大三在读生”都四面成功拿到字节跳动Offer了，你还有什么理由去摸鱼？'
  },
  {
    title: '都2021了，Android 现如今还没有凉嘛？'
  },
  {
    title: '比尔盖茨离婚事件：给想进互联网大厂的人的唯一启示'
  },
  {
    title: '我竟然用python玩阴阳师？'
  },
  {
    title: 'Linux 操作作业'
  },
  {
    title: '北漂生活第五弹-第一天上班'
  },
  {
    title: '花了我 一个晚上整理了十个 Python 自动化操作，拿走就用'
  },
  {
    title: '可视化实验四：大数据可视化工具—ECharts（二）'
  },
  {
    title: 'Laravel8.x+AntDesign+Vue前后端分离快速开发平台'
  },
  {
    title: '添加用户功能的实现'
  },
  {
    title: '2021Q1最受欢迎语言，你get到了吗？'
  },
  {
    title: '《图解Vue3.0》- 第1节 Vue初识'
  },
  {
    title: '反复刷这些javascript面试手写题，我感觉我真的变强了（一）'
  },
  {
    title: '【进击全栈 1】SpringCloud项目起步、nacos、gateway、Redis、mybatis组件搭建'
  },
  {
    title: 'web前端工程师面试题—2021(推荐收藏以便临阵磨枪)'
  },
  {
    title: '前后端分离第7期的基于Vue+Springboot精简版仿小米商城系统'
  },
  {
    title: 'JavaScript学习手册（56）'
  },
  {
    title: '小米商城项目(上)'
  }
];
/**
 * 测试
 */
router.get('/getList', async (ctx, next) => {
  let json = { ...returnJSON };
  let { page, size } = ctx.query;
  if (!page) {
    page = 1;
  } else {
    page = parseInt(page) || 1;
  }
  if (!size) {
    size = listData.length;
  } else {
    size = parseInt(size) || listData.length;
  }
  json.data = {
    page: page,
    size: size,
    total: listData.length,
    list: listData.slice((page - 1) * size, (page - 1) * size + size)
  };
  ctx.body = json;
});

/**
 * 测试
 */
router.post('/postData', async (ctx, next) => {
  let json = { ...returnJSON };
  let body = ctx.request.body;

  json.data = {
    body
  };

  ctx.body = json;
});

router.get('/A', async (ctx, next) => {
  let json = { ...returnJSON };
  json.data = {
    msg: '接口 A 执行完成'
  };
  ctx.body = json;
});

router.get('/B', async (ctx, next) => {
  let json = { ...returnJSON };
  json.data = {
    msg: '接口 B 执行完成'
  };
  ctx.body = json;
});

router.get('/C', async (ctx, next) => {
  let json = { ...returnJSON };
  json.data = {
    msg: '接口 C 执行完成'
  };
  ctx.body = json;
});

router.get('/D', async (ctx, next) => {
  let json = { ...returnJSON };
  json.data = {
    msg: '接口 D 执行完成'
  };
  ctx.body = json;
});

module.exports = router.routes();
