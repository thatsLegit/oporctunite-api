const Sequelize = require('sequelize');
const DB = require('../config/db');

const Utilisateur = DB.define('Utilisateur', {
    idutilisateur: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    telephone: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    ville: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    telephone: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    codePostal: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
    },
    adresse: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    utilisateurPhoto: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    type_utilisateur: {
        type: Sequelize.STRING(11),
        allowNull: false
    }
});


module.exports = Utilisateur;