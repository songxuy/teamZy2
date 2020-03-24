const path = require('path')
console.log(__dirname);//目录的绝对路径
console.log(__filename);//文件的绝对路径
console.log(process.cwd());//返回运行 node 命令时所在的文件夹的绝对路径
console.log(path.resolve('./'));
console.log(path.normalize('/koala/Desktop//程序员成长指北//代码pra/..'));//规范路径
console.log(path.join('src', 'task.js'));//拼接路径
console.log(path.parse('/koala/Desktop/程序员成长指北/代码pra/node核心API'));//返回一个关于路径的对象
/* 
{ root: '/',
  dir: '/koala/Desktop/程序员成长指北/代码pra',
  base: 'node核心API',
  ext: '',
  name: 'node核心API' }
root：代表根目录
dir：代表文件所在的文件夹
base：代表整一个文件
name：代表文件名
ext: 代表文件的后缀名
*/
console.log(path.basename('/koala/Desktop/程序员成长指北/代码pra/node核心API'));
console.log(path.basename('/koala/Desktop/程序员成长指北/代码pra/node核心API/path.js', '.js'));//basename接收两个参数，第一个是path，第二个是ext(可选参数)，当输入第二个参数的时候，
//打印结果不出现后缀名
console.log(path.dirname('/koala/Desktop/程序员成长指北/代码pra/node核心API/a.js'));//返回文件的目录完整地址 /koala/Desktop/程序员成长指北/代码pra
path.extname('index.html');//返回文件后缀名
console.log(path.resolve('/foo/bar', 'bar/faa', '..', 'a/../c'));//path.resolve就相当于是shell下面的cd操作，从左到右运行一遍cd path命令，最终获取的绝对路径/文件名，这个接口所返回的结果了。
