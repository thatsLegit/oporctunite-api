const Test = require('../models/Test');
const moment = require('moment');
const DB = require('../config/db');
const Sequelize = require('sequelize');

//Ce controller permet de définir les opérations propres au calcul des notes (globales ou utilisateur) à partir des valeurs de tests


// @desc        Note globale sur une catégorie
// @route       POST /api/v1/bilans/categorie
// @access      Public

// SELECT *, AVG(T.valeur)
// FROM categorie_g GC
// INNER JOIN categorie_p PC
// ON GC.nomCategorieG = PC.nomCategorieG
// INNER JOIN evaluation L 
// ON L.nomCategorieP = PC.nomCategorieP
// INNER JOIN test T 
// ON T.nomEvaluation = L.nomEvaluation
// WHERE GC.nomCategorieG = :categG
// AND T.dateT >= :date;

exports.getNoteGlobaleCategorie = async (req, res, next) => {
    //FORMAT BD : 2020-01-17 00:00:00
    let date6monthsAgo = moment(new Date(Date.now())).subtract(6, 'months').format('YYYY-MM-Do HH:mm:ss');
    let categ = req.body.categ;
    const result = await DB.query("SELECT AVG(T.valeur) FROM categorie_g GC INNER JOIN categorie_p PC ON GC.nomCategorieG = PC.nomCategorieG INNER JOIN evaluation E ON E.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = E.nomEvaluation WHERE GC.nomCategorieG = :categG AND T.dateT >= :date", {
        replacements: { date: date6monthsAgo, categG: categ },
        raw: true,
        type: Sequelize.QueryTypes.SELECT
    });
    res.status(200).json({ success: true, data: result });
};


// @desc        Note globale sur une sous-catégorie
// @route       POST /api/v1/bilans/sous-categorie
// @access      Public

// FROM categorie_p PC
// INNER JOIN evaluation E 
// ON E.nomCategorieP = PC.nomCategorieP
// INNER JOIN test T 
// ON T.nomEvaluation = E.nomEvaluation
// WHERE PC.nomCategorieP = "Absence de maladies"
// AND T.dateT >= :date;

exports.getNoteGlobaleSousCategorie = async (req, res, next) => {
    let date6monthsAgo = moment(new Date(Date.now())).subtract(6, 'months').format('YYYY-MM-Do HH:mm:ss');
    let categ = req.body.categ;
    const result = await DB.query("SELECT AVG(T.valeur) FROM categorie_p PC INNER JOIN evaluation E ON E.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = E.nomEvaluation WHERE PC.nomCategorieP = :categP AND T.dateT >= :date", {
        replacements: { date: date6monthsAgo, categP: categ },
        raw: true,
        type: Sequelize.QueryTypes.SELECT
    });
    res.status(200).json({ success: true, data: result });
};


// @desc        Note globale sur une évaluation
// @route       POST /api/v1/bilans/evaluation
// @access      Public

// SELECT AVG(T.valeur)
// FROM evaluation L
// INNER JOIN test T 
// ON T.nomEvaluation = L.nomEvaluation
// INNER JOIN elevage E 
// ON E.numEleveur = T.numEleveur
// WHERE L.nomEvaluation = "nombre de bursites"
// AND T.dateT >= '2020-01-17 00:00:00';

exports.getNoteGlobaleEvaluation = async (req, res, next) => {
    let date6monthsAgo = moment(new Date(Date.now())).subtract(6, 'months').format('YYYY-MM-Do HH:mm:ss');
    let evaluation = req.body.evaluation;
    const result = await DB.query("SELECT AVG(T.valeur) FROM evaluation L INNER JOIN test T ON T.nomEvaluation = L.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE L.nomEvaluation = :evaluation AND T.dateT >= :date", {
        replacements: { date: date6monthsAgo, evaluation },
        raw: true,
        type: Sequelize.QueryTypes.SELECT
    });
    res.status(200).json({ success: true, data: result });
};