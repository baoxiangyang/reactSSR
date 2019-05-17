const router = require('koa-router')()

router.prefix('/api')

router.get('/getMapList', function (ctx, next) {
  ctx.body = [{point: [110.306265,25.070233], name: '旅游学院', info: '这里是详情呀', Db: 50, id:1},
      {point: [110.306907,25.06906], name: '图书馆', info: '这里是详情呀', Db: 42, id: 2}, 
      {point: [110.306175,25.067574], name: '理学院', info: '这里是详情呀', Db: 89, id: 3}, 
      {point: [110.309554,25.070663], name: '博物馆', info: '这里是详情呀', Db: 23, id: 4}, 
      {point: [110.304351,25.0712], name: '桂林雅苑民宿', info: '这里是详情呀', Db: 78, id: 5}]
})

module.exports = router
