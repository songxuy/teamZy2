const md5 = require('md5-node')
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const moment = require('moment')
const tools = require('../utils/index')
exports.userinsert = async (ctx,next) => {
    const {username, password, age} = ctx.request.body
    if(!username || !password ||!age){
        ctx.body = {
            code: 500,
            message: '请将信息填写完整'
        }
    }
    await User.findOneAsync({ username: username })
    .then(result => {
        if (result) {
            ctx.body = {
                code: 500,
                message: '该用户名已经存在~'
            }
        } else {
            return User.createAsync({
                username,
                password,
                age,
                create_date: moment().format('YYYY-MM-DD HH:mm:ss')
            })
                .then(() => {
                    ctx.body = {
                        code: 200,
                        message: '注册成功'
                    }
                })
                .catch(err => {
                    ctx.body = {
                        code: 500,
                        message: err.toString()
                    }
                })
        }
    })
    .catch(err => {
        ctx.body = {
            code: 500,
            message: err.toString()
        }
    })

}

exports.login = async (ctx, next) => {
    const {username, password} = ctx.request.body
    if(!username || !password) {
        ctx.body = {
            code: 500,
            message: '请将信息填写完整'
        }
    }
    await User.findOneAsync({username,password})
    .then(result => {
        if(result){
            var userid = result._id
            const token = jwt.sign({
                name: username,
                userid: userid
            }, 'my_token', { expiresIn: '2h' });
            ctx.body = {
                code: 200,
                message: 'success',
                data: token
            }
        }else{
            ctx.body = {
                code: 500,
                message: '用户名或密码错误！'
            }  
        }
    })
}
exports.addAge = async (ctx, next) => {
  let token = ctx.headers.authorization
  if (token) {
    var name = await tools.verToken(token)
    await User.updateOneAsync({ _id: name.userid }, { $inc: { age : 1 }, update_date: moment().format('YYYY-MM-DD HH:mm:ss') })
    .then(async res => {
      if(res){
        /* io.on('connection', function (socket) {
          io.emit('message', 'hello')
        }); */
        let data = await User.findOneAsync({ _id: name.userid })
        /* console.log(typeof global.io)
        Object.keys(global.io.sockets.sockets).map(item => {
            console.log(item)
        }) */
        console.log(typeof global.io.sockets.sockets)
        /* if (global.io.sockets.connected[global.io.sockets.id]) {
            console.log('socket')
            global.io.sockets.connected[global.io.sockets.id].emit('message', data.age)
        } */
        /* let arr = global.io.sockets.sockets.filter(item => {
            return item.handshake.query.token === token
        }) */
        Object.keys(global.io.sockets.sockets).map(item => {
            if (global.io.sockets.sockets[item].handshake.query.token === token) {
                global.io.sockets.connected[item].emit('message', data.age)
            }
        })
        ctx.body = {
          code: 200,
          message: '添加成功~'
        }
      }else {
        ctx.body = {
          code: 200,
          message: '添加失败~'
        } 
      }
    })
  } else {
    ctx.body = {
      code: -200,
      message: '请登录~'
    }
  }
}
exports.center = async (ctx, next) => {
  console.log('center')
  await next()
}