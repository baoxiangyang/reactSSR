const router = require('koa-router')()

router.prefix('/api')

router.get('/getMapList', function (ctx, next) {
  ctx.body = [{point: [106.553263,29.557058], name: '我是名称11111111', info: '这里是详情呀', Db: 50},
  {point: [106.584746,29.568159], name: '我是名称22222222', info: '这里是详情呀', Db: 42}, 
  {point: [106.560713,29.571035], name: '我是名称33333333', info: '这里是详情呀', Db: 89}, 
  {point: [106.578392,29.582688], name: '我是名称44444444', info: '这里是详情呀', Db: 23}, 
  {point: [106.533261,29.587086], name: '我是名称55555555', info: '这里是详情呀', Db: 78}]
})

module.exports = router
