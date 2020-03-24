var db = require('./db');

var Manager = db.define(
    'manager', {
        id: {
            filed: 'id',
            primaryKey: true,
            type: Sequelize.BIGINT,
            allowNull: false
        },
        userName: {
            field: 'username',
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            field: 'password',
            type: Sequelize.STRING,
            allowNull: false
        },
        createTime: {
            field: 'createTime',
            type: Sequelize.DATE,
            allowNull: false
        },
    }, {
        tableName: 'manager',
        timestamps: false,
        freezeTableName: true
    }
);

/* module.exports = Manager; */
Manager.sync({force:false}).then(() => {
    return Manager.create({
        id:1,
        userName:'sxy',
        password: '123',
        createTime: '2019-5-10'
    })
})