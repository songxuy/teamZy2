const mongoose = require('./db')
const Schema = mongoose.Schema
const Promise = require('bluebird')

const Movie = new Schema({
    id: {type: String, default: ''},
    name: {type: String, default: ''},
    href: {type: String, default: ''},
    image: {type: String, default: ''},
    score: {type: String, default: ''}
})

const DouBanMovie = mongoose.model('Movie',Movie)
Promise.promisifyAll(DouBanMovie)
Promise.promisifyAll(DouBanMovie.prototype)

module.exports = DouBanMovie