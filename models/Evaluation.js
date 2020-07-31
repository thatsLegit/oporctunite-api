const Sequelize = require('sequelize');
const DB = require('../config/db');
const Category_p = require('./Category_p');


const Evaluation = DB.define('evaluation', {
    nomEvaluation: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    priorite: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    idLiaison: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    description: {
        type: Sequelize.STRING(200)
    },
    nomCategorieP: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
            model: Category_p,
            key: 'nomCategorieP'
        }
    },
    nbTruies: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        validate: {
            isInt: true
        }
    },
    photo1: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    photo2: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    photo3: {
        type: Sequelize.STRING(255),
        allowNull: true
    }
});


module.exports = Evaluation;