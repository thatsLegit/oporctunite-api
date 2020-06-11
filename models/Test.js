const Sequelize = require('sequelize');
const DB = require('../config/db');
const Elevage = require('./Elevage');
const Evaluation = require('./Evaluation');

const Test = DB.define('Test', {
    idTest: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    valeur: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    dateT: {
        type: Sequelize.DATE,
        allowNull: true
    },
    nbTruies: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    numEleveur: {
        type: Sequelize.STRING(7),
        allowNull: false,
        references: {
            model: Elevage,
            key: 'numEleveur'
        }
    },
    nomEvaluation: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
            model: Evaluation,
            key: 'nomEvaluation'
        }
    }
});


module.exports = Test;