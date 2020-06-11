const Sequelize = require('sequelize');
const db = require('../config/db');
const Category_g = require('./Category_g');


const Category_p = db.define('Category_p', {
    nomCategorieP: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true
    },
    nomCategorieG: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: Category_g,
            key: 'nomCategorieG'
        }
    }
});

Category_g.hasMany(Category_p, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Category_g.belongsTo(Category_p);


module.exports = Category_p;