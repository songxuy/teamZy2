const jwt = require('jsonwebtoken')
exports.verToken = function (token) {
  return new Promise((resolve, reject) => {
    var info = jwt.verify(token.split(' ')[1], 'my_token')
    resolve(info)
  })
}