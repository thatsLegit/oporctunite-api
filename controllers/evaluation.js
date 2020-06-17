const DB = require('../config/db');
const Sequelize = require('sequelize');

//Ce controller permet de d'afficher les sous-catégories à partir d'une catégorie, et des évaluations à partir d'une sous-catégorie afin de pouvoir être selectionner pour réaliser un ou plusieurs test sur les évaluations choisies


// @desc        Requête qui affiche les sous-catégories pour une catégorie donnée
// @route       POST /api/v1/bilans/categorie
// @access      Public

// SELECT P.nomCategorieP FROM categorie_p AS P WHERE P.nomCategorieG= :categG


exports.getSousCategories = async (req, res, next) => {
    try {
        const categ = req.body.categ;

        const result = await DB.query("SELECT P.nomCategorieP FROM categorie_p AS P WHERE P.nomCategorieG= :categG", {
            replacements: {categG: categ },
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};

exports.getEvaluations = async (req, res, next) => {
    try {
        const categ = req.body.categ;

        const result = await DB.query("SELECT E.nomEvaluation FROM evaluation E WHERE E.nomCategorieP = :categP", {
            replacements: {categP: categ },
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};



