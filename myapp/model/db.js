let Sequelize = require('sequelize');
//var models=module.exports={};
var sequelize = new Sequelize(
    'dbName',
    'dbUser',
    'userPassword', 
    {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
        timezone: '+08:00'
    });


module.exports = sequelize;