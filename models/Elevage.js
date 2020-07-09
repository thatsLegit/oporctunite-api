const Sequelize = require('sequelize');
const DB = require('../config/db');
const Utilisateur = require('./Utilisateur');


const Model = Sequelize.Model;
class Elevage extends Model { }

Elevage.init({
    numEleveur: {
        type: Sequelize.STRING(7),
        unique: true,
        allowNull: false,
        primaryKey: true,
        validate: {
            is: /^FR.{5}$/
        }
    },
    nomElevage: {
        type: Sequelize.STRING(50),
        unique: true,
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
}, {
    sequelize: DB,
    modelName: 'elevage'
});



module.exports = Elevage;