var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

var server = http.createServer(function(request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);
    // 获取文件状态:
    fs.stat(filepath, function(err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            success(filepath);
        } else if (!err && stats.isDirectory()) {
            // 状态为目录:
            // 获取缺省文件目录数组:
            var filepathArr = [
                path.join(root, "/index.html"),
                path.join(root, "/default.html")
            ];
            // 获取文件状态:
            fs.stat(filepathArr[0], function(err, stats) {
                // 尝试第一个目录
                if (!err && stats.isFile()) {
                    // 没有出错并且文件存在:
                    success(filepathArr[0]);
                } else {
                    // 出错了或文件不存在:
                    fs.stat(filepathArr[1], function(err, stats) {
                        // 尝试第二个目录:
                        if (!err && stats.isFile()) {
                            success(filepathArr[1]);
                        } else {
                            to_404();
                        }
                    });
                }
            });
        } else {
            // 出错了或者文件不存在:
            to_404();
        }
    });

    var to_404 = function() {
        console.log("404 " + request.url);
        // 发送404响应:
        response.writeHead(404);
        response.end("404 Not Found");
    };

    var success = function(filepath) {
        console.log("200 " + request.url);
        // 发送200响应:
        response.writeHead(200);
        // 将文件流导向response:
        fs.createReadStream(filepath).pipe(response);
    };
});

server.listen(8080);

console.log("Server is running at http://127.0.0.1:8080/");