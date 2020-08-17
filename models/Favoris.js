const Sequelize = require('sequelize');
const DB = require('../config/db');


const Favoris = DB.define('mettrefavoris', {
    idutilisateur: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
    },
    titreFiche: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    dateFavoris: {
        type: Sequelize.DATE,
        allowNull: true
    }
});


module.exports = Favoris;