const Sequelize = require('sequelize');
const DB = require('../config/db');

const Utilisateur = DB.define('utilisateur', {
    idutilisateur: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        isEmail: true
    },
    telephone: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        validate: {
            is: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
        }
    },
    ville: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            is: ["^[a-z]+$", 'i']
        }
    },
    codePostal: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
        validate: {
            iisInt: true
        }
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
        allowNull: false,
        validate: {
            isIn: [['elevage', 'veterinaire']]
        }
    }
});


module.exports = Utilisateur;