const http = require('http')
const server = http.createServer((req,res) => {
    res.writeHead(200,{
        'Content-Type':'text/html;charset="utf-8"'
    })
    res.write('<h1>hello world!</h1><h2>this is powerd by nodeJs!</h2>')
    res.end()
})
server.listen(8080);