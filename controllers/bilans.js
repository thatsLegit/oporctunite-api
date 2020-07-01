const moment = require('moment');
const DB = require('../config/db');
const Sequelize = require('sequelize');
const Elevage = require('../models/Elevage');
const ErrorResponse = require('../helper/errorResponse');

//Ce controller permet de définir les opérations propres au calcul des notes (globales ou utilisateur) à partir des valeurs de tests
//FORMAT BD : 2020-01-17 00:00:00


// @desc        Note globale sur une catégorie
// @route       POST /api/v1/bilans/categorie ou /api/v1/eleveurs/:numEleveur/bilans/categorie
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

//OU si numEleveur :

// SELECT AVG(T.valeur)
// FROM categorie_g GC
// INNER JOIN categorie_p PC
// ON GC.nomCategorieG = PC.nomCategorieG
// INNER JOIN evaluation L 
// ON L.nomCategorieP = PC.nomCategorieP
// INNER JOIN test T 
// ON T.nomEvaluation = L.nomEvaluation
// INNER JOIN elevage E 
// ON E.numEleveur = T.numEleveur
// WHERE GC.nomCategorieG = "Bonne santé"
// AND E.numEleveur= "FR312D1"
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
//     WHERE GC.nomCategorieG = "Bonne santé"
//     AND E.numEleveur= "FR312D1"
//     GROUP BY T.nomEvaluation
// )

//En gros si on a un numEleveur en param, ce sera note utilisateur, sinon, note globale

exports.getNoteCategorie = async (req, res, next) => {
    try {

        const numEleveur = req.params.numEleveur ? req.params.numEleveur : null;

        if (numEleveur) {
            const eleveur = await Elevage.findByPk(numEleveur);

            if (!eleveur) {
                return next(new ErrorResponse(`Aucun eleveur trouvé avec l'id ${numEleveur}`, 404));
            }

            const result = await DB.query("SELECT AVG(T.valeur), GC.nomCategorieG FROM categorie_g GC INNER JOIN categorie_p PC ON GC.nomCategorieG = PC.nomCategorieG INNER JOIN evaluation L ON L.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = L.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE E.numEleveur=:numEleveur AND T.dateT IN (SELECT MAX(T.dateT) FROM categorie_g GC INNER JOIN categorie_p PC ON GC.nomCategorieG = PC.nomCategorieG INNER JOIN evaluation L ON L.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = L.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE E.numEleveur=:numEleveur GROUP BY T.nomEvaluation) GROUP BY GC.nomCategorieG", {
                replacements: { numEleveur },
                raw: true,
                type: Sequelize.QueryTypes.SELECT
            });
            return res.status(200).json({ success: true, data: result });
        }

        const date6monthsAgo = moment(new Date(Date.now())).subtract(6, 'months').format('YYYY-MM-Do HH:mm:ss');

        const result = await DB.query("SELECT AVG(T.valeur), GC.nomCategorieG FROM categorie_g GC INNER JOIN categorie_p PC ON GC.nomCategorieG = PC.nomCategorieG INNER JOIN evaluation E ON E.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = E.nomEvaluation WHERE T.dateT >= :date GROUP BY GC.nomCategorieG", {
            replacements: { date: date6monthsAgo},
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};


// @desc        Note globale sur une sous-catégorie
// @route       POST /api/v1/bilans/sous-categorie ou /api/v1/eleveurs/:numEleveur/bilans/sous-categorie
// @access      Public

// FROM categorie_p PC
// INNER JOIN evaluation E 
// ON E.nomCategorieP = PC.nomCategorieP
// INNER JOIN test T 
// ON T.nomEvaluation = E.nomEvaluation
// WHERE PC.nomCategorieP = "Absence de maladies"
// AND T.dateT >= :date;

//OU si numEleveur

// SELECT  AVG(T.valeur)
// FROM categorie_p PC
// INNER JOIN evaluation L 
// ON L.nomCategorieP = PC.nomCategorieP
// INNER JOIN test T 
// ON T.nomEvaluation = L.nomEvaluation
// INNER JOIN elevage E 
// ON E.numEleveur = T.numEleveur
// WHERE PC.nomCategorieP = "Absence de maladies"
// AND E.numEleveur= "FR312D1"
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
//     WHERE PC.nomCategorieP = "Absence de maladies"
//     AND E.numEleveur= "FR312D1"
//     group by T.nomEvaluation
// )


exports.getNoteSousCategorie = async (req, res, next) => {
    try {
        const categ = req.body.categ;
        const numEleveur = req.params.numEleveur ? req.params.numEleveur : null;

        if (numEleveur) {
            const eleveur = await Elevage.findByPk(numEleveur);

            if (!eleveur) {
                return next(new ErrorResponse(`Aucun eleveur trouvé avec l'id ${numEleveur}`, 404));
            }

            const result = await DB.query("SELECT AVG(T.valeur) FROM categorie_p PC INNER JOIN evaluation L ON L.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = L.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE PC.nomCategorieP = :categP AND E.numEleveur= :numEleveur AND T.dateT IN (SELECT MAX(T.dateT) FROM categorie_g GC INNER JOIN categorie_p PC ON GC.nomCategorieG = PC.nomCategorieG INNER JOIN evaluation L ON L.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = L.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE PC.nomCategorieP = :categP AND E.numEleveur= :numEleveur GROUP BY T.nomEvaluation)", {
                replacements: { categP: categ, numEleveur },
                raw: true,
                type: Sequelize.QueryTypes.SELECT
            });
            return res.status(200).json({ success: true, data: result });
        }

        const date6monthsAgo = moment(new Date(Date.now())).subtract(6, 'months').format('YYYY-MM-Do HH:mm:ss');

        const result = await DB.query("SELECT AVG(T.valeur) FROM categorie_p PC INNER JOIN evaluation E ON E.nomCategorieP = PC.nomCategorieP INNER JOIN test T ON T.nomEvaluation = E.nomEvaluation WHERE PC.nomCategorieP = :categP AND T.dateT >= :date", {
            replacements: { date: date6monthsAgo, categP: categ },
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });
        res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};


// @desc        Note globale sur une évaluation
// @route       POST /api/v1/bilans/evaluation ou /api/v1/eleveurs/:numEleveur/bilans/evaluation
// @access      Public

// SELECT AVG(T.valeur)
// FROM evaluation L
// INNER JOIN test T 
// ON T.nomEvaluation = L.nomEvaluation
// INNER JOIN elevage E 
// ON E.numEleveur = T.numEleveur
// WHERE L.nomEvaluation = "nombre de bursites"
// AND T.dateT >= '2020-01-17 00:00:00';

//OU si numEleveur

// SELECT T.valeur
// FROM evaluation L
// INNER JOIN test T 
// ON T.nomEvaluation = L.nomEvaluation
// INNER JOIN elevage E 
// ON E.numEleveur = T.numEleveur
// WHERE L.nomEvaluation = "nombre de bursites"
// AND E.numEleveur= "FR312D3"
// ORDER BY T.dateT DESC
// LIMIT 1;


exports.getNoteEvaluation = async (req, res, next) => {
    try {
        const evaluation = req.body.evaluation;
        const numEleveur = req.params.numEleveur ? req.params.numEleveur : null;

        if (numEleveur) {
            const eleveur = await Elevage.findByPk(numEleveur);

            if (!eleveur) {
                return next(new ErrorResponse(`Aucun eleveur trouvé avec l'id ${numEleveur}`, 404));
            }

            const result = await DB.query("SELECT T.valeur FROM evaluation L INNER JOIN test T ON T.nomEvaluation = L.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE L.nomEvaluation = :evaluation AND E.numEleveur= :numEleveur ORDER BY T.dateT DESC LIMIT 1;", {
                replacements: { evaluation, numEleveur },
                raw: true,
                type: Sequelize.QueryTypes.SELECT
            });
            return res.status(200).json({ success: true, data: result });
        }

        const date6monthsAgo = moment(new Date(Date.now())).subtract(6, 'months').format('YYYY-MM-Do HH:mm:ss');

        const result = await DB.query("SELECT AVG(T.valeur) FROM evaluation L INNER JOIN test T ON T.nomEvaluation = L.nomEvaluation INNER JOIN elevage E ON E.numEleveur = T.numEleveur WHERE L.nomEvaluation = :evaluation AND T.dateT >= :date", {
            replacements: { date: date6monthsAgo, evaluation },
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};