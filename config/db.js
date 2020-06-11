const Sequelize = require('sequelize');


const DB = new Sequelize(process.env.MYSQL_URI, {
    define: {
        timestamps: false, //disables createdAt and updatedAt by default
        freezeTableName: true, //disablesthe 's' in querying tables
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+01:00'
});


module.exports = DB;