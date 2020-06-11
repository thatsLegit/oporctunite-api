const Sequelize = require('sequelize');
const DB = require('../config/db');
const Utilisateur = require('./Utilisateur');


const Elevage = DB.define('Elevage', {
    numEleveur: {
        type: Sequelize.STRING(7),
        allowNull: false,
        primaryKey: true
    },
    nomElevage: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    tailleElevage: {
        type: Sequelize.INTEGER(11),
        allowNull: false
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

Utilisateur.hasOne(Elevage, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Elevage.belongsTo(Utilisateur);


module.exports = Elevage;