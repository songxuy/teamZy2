const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
/* const session=require('koa-session'); */
const koajwt = require('koa-jwt');
const index = require('./routes/index')
const users = require('./routes/users')

const http = require('http');
let server = http.createServer(app);
//注意，websocket的握手是需要依赖http服务的，所以这里要把server传入进去。
global.io = require('socket.io')(server);
// error handler
onerror(app)
require('./models/user')
/*
*app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  /*maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  /*overwrite: true, /** (boolean) can overwrite or not (default true) */
  /*httpOnly: true, /** (boolean) httpOnly or not (default true) */ /** (boolean) signed or not (default true) */
  /*signed: false
},app));*/
// middlewares
app.use((ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.status = 201;
          ctx.body = {
            data: {},
            code:401,
            message:'need login'
          }
      }else{
          throw err;
      }
  })
})
app.use(koajwt({
  secret: 'my_token'
}).unless({
  path: [/\/login/,/\/regis/]
}));
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
/* app.use(cookieParser()) */
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx, next) => {
  await next()
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

io.on('connection', function (socket) {
  console.log(socket.id)
  socket.on('message', function (data) {
      console.log('服务端收到 : ', data);
      //注意send()方法其实是发送一个 'message' 事件
      //客户端要通过on('message')来响应
      socket.send('你好客户端, ' + data);
  });
  //发生错误时触发
  socket.on('error', function (err) {
      console.log(err);
  });
  io.emit('message', 'hello')
});

server.listen(8888);
module.exports = app
