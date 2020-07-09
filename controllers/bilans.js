const moment = require('moment');
const DB = require('../config/db');
const Sequelize = require('sequelize');
const Elevage = require('../models/Elevage');
const ErrorResponse = require('../helper/errorResponse');

//Ce controller permet de définir les opérations propres au calcul des notes (globales ou utilisateur) à partir des valeurs de tests
//FORMAT BD : 2020-01-17 00:00:00


// @desc        Notes globales de toutes les catégories
// @route       GET /api/v1/bilans/categories
// @access      Private

// SELECT AVG(T.valeur) AS moyenneG
// FROM categorie_g GC
// INNER JOIN categorie_p PC
// ON GC.nomCategorieG = PC.nomCategorieG
// INNER JOIN evaluation L 
// ON L.nomCategorieP = PC.nomCategorieP
// INNER JOIN test T 
// ON T.nomEvaluation = L.nomEvaluation
// WHERE T.dateT >= :date
// GROUP BY GC.nomCategorieG;

exports.getNotesCategories = async (req, res, next) => {
    try {
        const date6monthsAgo = moment(new Date(Date.now())).subtract(6, 'months').format('YYYY-MM-Do HH:mm:ss');

        const result = await DB.query("SELECT AVG(T.valeur) AS moyenneG, GC.nomCategorieG FROM categorie_g GC INNER JOIN categorie_p PC ON GC.nomCategorieG = PC.nomCategorieG INNER JOIN evaluation E ON E.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = E.nomEvaluation WHERE T.dateT >= :date GROUP BY GC.nomCategorieG", {
            replacements: { date: date6monthsAgo },
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};

// @desc        Notes individuelles de toutes les catégories
// @route       GET /api/v1/bilans/categories/elevage
// @access      Private

// SELECT AVG(T.valeur) AS moyenneG
// FROM categorie_g GC
// INNER JOIN categorie_p PC
// ON GC.nomCategorieG = PC.nomCategorieG
// INNER JOIN evaluation L 
// ON L.nomCategorieP = PC.nomCategorieP
// INNER JOIN test T 
// ON T.nomEvaluation = L.nomEvaluation
// INNER JOIN elevage E 
// ON E.numEleveur = T.numEleveur
// WHERE E.numEleveur= "FR312D1"
// AND T.dateT IN (
//     SELECT MAX(T.dateT)
// 	FROM categorie_g GC
//     INNER JOIN categorie_p PC
//     ON GC.nomCategorieG = PC.nomCategorieG
//     INNER JOIN evaluation L 
//     ON L.nomCategorieP = PC.nomCategorieP
//     INNER JOIN test T 
//     ON T.nomEvaluation = L.nomEvaluation
//     INNER JOIN elevage E 
//     ON E.numEleveur = T.numEleveur
//     WHERE E.numEleveur= "FR312D1"
//     GROUP BY T.nomEvaluation
// )

exports.getNotesCategoriesIndividuelles = async (req, res, next) => {
    try {
        const numEleveur = req.elevage.numEleveur;

        const result = await DB.query("SELECT AVG(T.valeur) AS moyenneG, GC.nomCategorieG FROM categorie_g GC INNER JOIN categorie_p PC ON GC.nomCategorieG = PC.nomCategorieG INNER JOIN evaluation L ON L.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = L.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE E.numEleveur=:numEleveur AND T.dateT IN (SELECT MAX(T.dateT) FROM categorie_g GC INNER JOIN categorie_p PC ON GC.nomCategorieG = PC.nomCategorieG INNER JOIN evaluation L ON L.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = L.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE E.numEleveur=:numEleveur GROUP BY T.nomEvaluation) GROUP BY GC.nomCategorieG", {
            replacements: { numEleveur },
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });
        return res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};


// @desc        Notes globales de toutes les sous-catégories
// @route       GET /api/v1/bilans/sous-categories
// @access      Private

// SELECT AVG(T.valeur) AS moyenneP
// FROM categorie_p PC
// INNER JOIN evaluation L 
// ON L.nomCategorieP = PC.nomCategorieP
// INNER JOIN test T 
// ON T.nomEvaluation = L.nomEvaluation
// WHERE T.dateT >= :date
// GROUP BY PC.nomCategorieP;

exports.getNotesSousCategories = async (req, res, next) => {
    try {
        const date6monthsAgo = moment(new Date(Date.now())).subtract(6, 'months').format('YYYY-MM-Do HH:mm:ss');

        const result = await DB.query("SELECT AVG(T.valeur) AS moyenneP, PC.nomCategorieP, PC.nomCategorieG FROM categorie_p PC INNER JOIN evaluation E ON E.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = E.nomEvaluation WHERE T.dateT >= :date GROUP BY PC.nomCategorieP  ORDER BY PC.nomCategorieG", {
            replacements: { date: date6monthsAgo },
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });
        res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};

// @desc        Notes individuelles sur toutes les sous-catégories
// @route       GET /api/v1/bilans/sous-categories/elevage
// @access      Private

// SELECT AVG(T.valeur) AS moyenneP, PC.nomCategorieP, PC.nomCategorieG 
// FROM categorie_p PC 
// INNER JOIN evaluation L 
// ON L.nomCategorieP = PC.nomCategorieP 
// INNER JOIN test T 
// ON T.nomEvaluation = L.nomEvaluation 
// INNER JOIN elevage E 
// ON E.numEleveur = T.numEleveur 
// WHERE E.numEleveur= :numEleveur 
// AND T.dateT IN (SELECT MAX(T.dateT) 
//     FROM categorie_g GC 
//     INNER JOIN categorie_p PC 
//     ON GC.nomCategorieG = PC.nomCategorieG 
//     INNER JOIN evaluation L 
//     ON L.nomCategorieP = PC.nomCategorieP 
//     INNER JOIN test T 
//     ON T.nomEvaluation = L.nomEvaluation 
//     INNER JOIN elevage E 
//     ON E.numEleveur = T.numEleveur
//     WHERE E.numEleveur= :numEleveur 
//     GROUP BY T.nomEvaluation) 
// GROUP BY PC.nomCategorieP 
// ORDER BY PC.nomCategorieG;

exports.getNotesSousCategoriesIndividuelles = async (req, res, next) => {
    try {
        const numEleveur = req.elevage.numEleveur;

        const result = await DB.query("SELECT AVG(T.valeur) AS moyenneP, PC.nomCategorieP, PC.nomCategorieG FROM categorie_p PC INNER JOIN evaluation L ON L.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = L.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE E.numEleveur= :numEleveur AND T.dateT IN (SELECT MAX(T.dateT) FROM categorie_g GC INNER JOIN categorie_p PC ON GC.nomCategorieG = PC.nomCategorieG INNER JOIN evaluation L ON L.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = L.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE E.numEleveur= :numEleveur GROUP BY T.nomEvaluation) GROUP BY PC.nomCategorieP ORDER BY PC.nomCategorieG", {
            replacements: { numEleveur },
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });
        return res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};


// @desc        Notes globales de toutes les évaluations
// @route       GET /api/v1/bilans/evaluations
// @access      Private

// SELECT AVG(T.valeur)
// FROM evaluation L
// INNER JOIN test T 
// ON T.nomEvaluation = L.nomEvaluation
// INNER JOIN elevage E 
// ON E.numEleveur = T.numEleveur
// WHERE T.dateT >= '2020-01-17 00:00:00';

exports.getNotesEvaluations = async (req, res, next) => {
    try {
        const date6monthsAgo = moment(new Date(Date.now())).subtract(6, 'months').format('YYYY-MM-Do HH:mm:ss');

        const result = await DB.query("SELECT AVG(T.valeur) AS moyenneE, T.nomEvaluation, T.dateT, T.idTest FROM evaluation L INNER JOIN test T ON T.nomEvaluation = L.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE T.dateT >= :date GROUP BY T.idTest ORDER BY T.dateT DESC", {
            replacements: { date: date6monthsAgo },
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};

// @desc        Notes individuelles de toutes les évaluations
// @route       GET /api/v1/bilans/evaluations/elevage
// @access      Private

// SELECT T.valeur
// FROM evaluation L
// INNER JOIN test T 
// ON T.nomEvaluation = L.nomEvaluation
// INNER JOIN elevage E 
// ON E.numEleveur = T.numEleveur
// WHERE E.numEleveur= "FR312D3"
// ORDER BY T.dateT DESC
// LIMIT 1;

exports.getNotesEvaluationsIndividuelles = async (req, res, next) => {
    try {
        const numEleveur = req.elevage.numEleveur;

        const result = await DB.query("SELECT T.valeur, T.nomEvaluation, T.dateT, T.idTest FROM evaluation EL INNER JOIN test T ON T.nomEvaluation = EL.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE E.numEleveur= :numEleveur GROUP BY T.idTest ORDER BY T.dateT DESC", {
            replacements: { numEleveur },
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });
        return res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};