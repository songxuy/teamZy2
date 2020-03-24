const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
  const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
  })
  const context = {
    title: 'hello vuessr',
    meta: `
      <meta charset="utf-8">
    `
  }
//***
renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    res.end(html)
})
})

server.listen(8080)