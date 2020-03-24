const mongoose = require('../mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')

const UserSchema = new Schema({
    username: {type: String, default: ''},
    password: {type: String, default: ''},
    age: {type: Number, default: 0},
    create_date: {type: String, default: ''},
    update_date: {type: String, default: ''}
})

const User = mongoose.model('User',UserSchema)
Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)

module.exports = User