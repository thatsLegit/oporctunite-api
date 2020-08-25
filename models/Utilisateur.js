const Sequelize = require('sequelize');
const DB = require('../config/db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const Model = Sequelize.Model;
class Utilisateur extends Model {
    //Instance level method =/= static
    getSignedJwtToken() {
        return jwt.sign({ idutilisateur: this.idutilisateur }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
    }

    matchPasswords(enteredPassword) {
        let hash = crypto.createHash('md5').update(enteredPassword).digest("hex");
        if (hash == this.password) {
            return true;
        } else {
            return false;
        }
    }
}

Utilisateur.init({
    idutilisateur: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
        isEmail: true
    },
    telephone: {
        type: Sequelize.INTEGER(11),
        unique: true,
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
            isInt: true
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
}, {
    sequelize: DB,
    modelName: 'utilisateur'
});


module.exports = Utilisateur;