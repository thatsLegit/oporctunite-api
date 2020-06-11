const Sequelize = require('sequelize');
const db = require('../config/db');

const Category_g = db.define('Category_g', {
    nomCategorieG: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true
    }
});


module.exports = Category_g;