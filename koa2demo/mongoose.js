const mongoose = require('mongoose')
const db = 'mongodb://127.0.0.1:27017/songxy'
mongoose.Promise = require('bluebird')
mongoose.connect(db, { useNewUrlParser: true } )
module.exports = mongoose