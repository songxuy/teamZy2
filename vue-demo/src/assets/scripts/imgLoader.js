import list from './imgList'

var imgCouns = list.length
var lists = [].concat(list)
var urls = lists.map((url) => require(`./../images/${url}`))

let loadCount = 0
let loadProcess = 0
var totalCount = lists.length

// load one image，return a promise.resolve
function loadHander (url) {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.onload = function () {
      // 新加载了一个
      loadCount++
      loadProcess = parseInt((loadCount / totalCount) * 100, 10)
      return resolve(url)
    }
    img.onerror = reject
    img.src = url
  })
}

function imgLoaders (options) {
  var { limit, urls, loadHander } = options
  var loadHanderWrap = (url) => {
    var promise = loadHander(url).then(img => (
      {
        img,
        index: promise
      }
    ))
    return promise
  }
  // 先组合limit个请求对象
  var requestImgs = urls.splice(0, limit).map(url => { return loadHanderWrap(url) })
  // 如果总数小于并发数，我们直接把全部图片发出去
  if (imgCouns < urls) {
    return Promise.all(requestImgs)
  }
  // 这里reduce剩下的url,才用reduce，会将每一个url都过一遍，Promise.race，每一张图片，都等待race出后，马上push进入
  urls.reduce((last, url) => {
    return last.then(() => {
      return Promise.race(requestImgs)
    }).then((res) => { // 这里会返回最先执行完成的Promise
      // 查出到底是哪个promise被执行了
      var posIdx = requestImgs.findIndex((item) => {
        return item === res.index
      })
      // 把这个已经执行多promise剔除掉
      requestImgs.splice(posIdx, 1)
      requestImgs.push(loadHanderWrap(url))
    }).catch(error => {
      console.error(error)
    })
  }, Promise.resolve())
    .then(() => {
      return Promise.all(requestImgs)
    })
  // 先并发limit个图片请求出去
}

// 缓冲器;num是目标数
function imgLoadersStart (options) {
  let process = 0
  var { limit = 5, Process } = options
  imgLoaders({ limit, urls, loadHander })
  // debug
  // 递归来加数字
  let numberGrow = () => {
    let accTimer = setTimeout(() => {
      if (process < loadProcess) {
        process++
      }
      Process(process)
      if (process < 100) {
        numberGrow()
      } else {
        clearTimeout(accTimer)
      }
    }, 20)
  }
  numberGrow()
}

// 开始执行
export default (imgLoadersStart)
