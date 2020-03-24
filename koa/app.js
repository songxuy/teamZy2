const Koa = require('koa')
const Router = require('koa-router')
const render = require('./tools/render')
const app = new Koa()
const router = new Router()
app.use(async(ctx,next) => {
    await next()
    console.log(ctx.status)
    if(ctx.status===404){
        ctx.set('Content-Type','text/html;charset="utf-8"');
        const data = await render('404.html')
        ctx.body = data
    }
})

router.get('/',async (ctx) => {
    ctx.set('Content-Type','text/html;charset="utf-8"');
    const data = await render('index.html')
    ctx.body = data
})

router.get('/index',async (ctx) => {
    ctx.set('Content-Type','text/html;charset="utf-8"');
    const data = await render('index.html')
    ctx.body = data
})

router.get('/hello',async (ctx) => {
    ctx.set('Content-Type','text/html;charset="utf-8"');
    const data = await render('hello-world.html')
    ctx.body = data
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(8080)
console.log('Server start at 127.0.0.1:8080');