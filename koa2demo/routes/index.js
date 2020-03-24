const md5 = require('md5-node')
const jwt = require('jsonwebtoken');
const router = require('koa-router')()
const user = require('../apis/user')

router.get('/', async (ctx, next) => {
  let {name,age} = ctx.query
  if(name&&age){
    await ctx.render('index', {
      title: `Hello ${name}! This is Koa 2!`,
      age: `You are ${age} years old`
    })
  }else{
    await ctx.render('index', {
      title: 'Hello Koa 2!',
      age: ''
    })
  }
})

router.get('/string', async (ctx, next) => {
  let obj = {
    name: 'sxy',
    age: '12'
  }
  ctx.cookies.set('user','121234151512512',{
    maxAge: 2592000000
  })
  ctx.body = JSON.stringify(obj)
})

router.get('/json', async (ctx, next) => {
  let result = {
    code: 200,
    data: {
    },
    message: '登陆成功'
  }
  ctx.body = JSON.stringify(result)
})

router.post('/login', user.login)

router.post('/regis', user.userinsert)

router.get('/insert',user.center, user.addAge)
module.exports = router
