/* const mysql = require('mysql');
const bluebird = require('bluebird');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'my_movie',
    user: 'root',
    password: ''
});
connection.connect();

module.exports = bluebird.promisify(connection.query).bind(connection); */
const mongoose = require('mongoose')
const db = 'mongodb://127.0.0.1:27017/songxy'
mongoose.Promise = require('bluebird')
mongoose.connect(db, { useNewUrlParser: true } )
module.exports = mongoose