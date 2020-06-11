const Sequelize = require('sequelize');


const db = () => {
    const connectDB = new Sequelize(process.env.MYSQL_URI, {
        timestamps: false, //disables createdAt and updatedAt by default
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

    connectDB
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
};


module.exports = db;