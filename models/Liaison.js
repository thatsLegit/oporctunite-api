const Sequelize = require('sequelize');
const DB = require('../config/db');

const Liaison = DB.define('liaisons', {
    idLiaison: {
        type: Sequelize.INTEGER(2),
        primaryKey: true
    },
    NomEvalDouble: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});


module.exports = Liaison;