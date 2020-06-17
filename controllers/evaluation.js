const DB = require('../config/db');
const Sequelize = require('sequelize');

//Ce controller permet de d'afficher les sous-catégories à partir d'une catégorie, et des évaluations à partir d'une sous-catégorie afin de pouvoir être selectionner pour réaliser un ou plusieurs test sur les évaluations choisies


// @desc        Requête qui affiche les sous-catégories pour une catégorie donnée
// @route       POST /api/v1/evaluation/sous-categorie
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


// @desc        Requête qui affiche les évaluations pour une sous-catégorie donnée
// @route       POST /api/v1/evaluation/evaluation
// @access      Public

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


// @desc        Requête qui affiche les évaluations pour un mot ou lettre donnée
// @route       POST /api/v1/evaluation/evaluationParMot
// @access      Public

// L'usage de CONCAT() dans la requête est néccessaire car une fois la requête appelée, la variable  :mot est tranqformée en requête séparée des symboles '%'

exports.getEvaluationsParMot = async (req, res, next) => {
    try {
        const mot = req.body.mot;

        const result = await DB.query("SELECT E.nomEvaluation FROM evaluation E WHERE E.nomEvaluation LIKE CONCAT('%',:mot,'%') ", {
            replacements: {mot: mot },
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};



