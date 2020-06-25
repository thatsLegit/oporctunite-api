const Sequelize = require('sequelize');
const DB = require('../config/db');
const Utilisateur = require('./Utilisateur');


const Elevage = DB.define('elevage', {
    numEleveur: {
        type: Sequelize.STRING(7),
        allowNull: false,
        primaryKey: true,
        validate: {
            is: /^FR.{5}$/
        }
    },
    nomElevage: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    tailleElevage: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    idutilisateur: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
            model: Utilisateur,
            key: 'idutilisateur'
        }
    }
});


module.exports = Elevage;