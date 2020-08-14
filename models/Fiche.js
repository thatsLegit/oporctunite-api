const Sequelize = require('sequelize');
const DB = require('../config/db');
const Category_g = require('./Category_g');


const Fiche = DB.define('fiche', {
    titreFiche: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    urlImage: {
        type: Sequelize.STRING(255),
        allowNull: false,
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


module.exports = Fiche;