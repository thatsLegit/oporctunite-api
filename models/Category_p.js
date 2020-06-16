const Sequelize = require('sequelize');
const DB = require('../config/db');
const Category_g = require('./Category_g');


const Category_p = DB.define('category_p', {
    nomCategorieP: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true
    },
    nomCategorieG: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: Category_g,
            key: 'nomCategorieG'
        }
    }
});


module.exports = Category_p;