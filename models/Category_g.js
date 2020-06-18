const Sequelize = require('sequelize');
const DB = require('../config/db');

const Category_g = DB.define('categorie_g', {
    nomCategorieG: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true
    }
});


module.exports = Category_g;