const Sequelize = require('sequelize');
const db = require('../config/db');
const Category_p = require('./Category_p');


const Evaluation = db.define('Evaluation', {
    nomEvaluation: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING(200)
    },
    nomCategorieP: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
            model: Category_p,
            key: 'nomCategorieP'
        }
    }
});

Category_p.hasMany(Evaluation, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Evaluation.belongsTo(Category_p);


module.exports = Evaluation;