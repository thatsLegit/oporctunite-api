const Sequelize = require('sequelize');
const db = require('../config/db');
const Elevage = require('./Elevage');
const Evaluation = require('./Evaluation');

const Test = db.define('Test', {
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
    },
});

Elevage.belongsToMany(Evaluation, { //numEleveur
    through: 'Test',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Evaluation.belongsToMany(Elevage, { //nomEvaluation
    through: 'Test',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


module.exports = Test;
