const Sequelize = require('sequelize');
const DB = require('../config/db');
const Elevage = require('./Elevage');
const Evaluation = require('./Evaluation');

const Test = DB.define('test', {
    idTest: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: true,
    },
    valeur: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        validate: {
            min: 0,
            max: 10,
            isNumeric: true
        }
    },
    dateT: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    numEleveur: {
        type: Sequelize.STRING(7),
        allowNull: false,
        validate: {
            is: /^FR.{5}$/
        },
        references: {
            model: Elevage,
            key: 'numEleveur'
        }
    },
    nomEvaluation: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            is: /^[a-zA-Z ]*$/
        },
        references: {
            model: Evaluation,
            key: 'nomEvaluation'
        }
    }
});


module.exports = Test;