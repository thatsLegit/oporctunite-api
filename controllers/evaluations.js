const DB = require('../config/db');
const Sequelize = require('sequelize');
const Evaluation = require('../models/Evaluation');
const Op = Sequelize.Op;

//Controller dedié aux évaluations uniquement.


// @desc        get all evaluations
// @route       GET /api/v1/evaluations ou GET /api/v1/evaluations/mot 
// @access      Public

exports.getEvaluations = async (req, res, next) => {
    try {
        if (!req.params.mot) {
            const evaluations = await Evaluation.findAll();
            let result = evaluations.map(eval => eval.dataValues);

            return res.status(200).json({ success: true, count: result.length, data: result });
        }

        const mot = req.params.mot;
        const result = await Evaluation.findAll({
            where: {
                nomEvaluation: {
                    [Op.like]: `%${mot}%`
                }
            }
        });

        return res.status(200).json({ success: true, count: result.length, data: result });

    } catch (err) {
        next(err)
    }
};


// @desc        get a single evaluation
// @route       GET /api/v1/evaluations/nomEvaluation
// @access      Public

exports.getEvaluation = async (req, res, next) => {
    try {
        const evaluations = await Evaluation.findByPk(req.params.nomEvaluation);

        if (!evaluations) { //wrong id error
            return next(new ErrorResponse(`Aucune évaluation trouvée avec le nom d'évaluation ${req.params.nomEvaluation}`, 404));
        }

        let result = evaluations.dataValues;

        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        next(err)
    }
};

// @desc        create an evaluation
// @route       POST /api/v1/evaluations
// @access      Public

exports.createEvaluation = async (req, res, next) => {
    try {
        const evaluations = await Evaluation.create(req.body);

        return res.status(201).json({ success: true, data: evaluations });
    } catch (err) {
        next(err)
    }
};

// @desc        delete an evaluation
// @route       DELETE /api/v1/evaluations/nomEvaluation
// @access      Public

exports.deleteEvaluation = async (req, res, next) => {
    try {
        const evaluation = await Evaluation.findByPk(req.params.nomEvaluation);

        if (!evaluation) {
            return next(new ErrorResponse(`Aucune évaluation trouvée avec le nom d'évaluation ${req.params.nomEvaluation}`, 404));
        }

        await Evaluation.destroy({
            where: {
                nomEvaluation: req.params.nomEvaluation
            }
        });
        return res.status(200).json({ success: true });

    } catch (err) {
        next(err);
    }
};

// @desc        delete an evaluation
// @route       PUT /api/v1/evaluations/nomEvaluation
// @access      Public

exports.updateEvaluation = async (req, res, next) => {
    try {
        const evaluation = await Evaluation.findByPk(req.params.nomEvaluation);

        if (!evaluation) {
            return next(new ErrorResponse(`Aucune évaluation trouvée avec le nom d'évaluation ${req.params.nomEvaluation}`, 404));
        }

        await evaluation.update(req.body);
        return res.status(200).json({ success: true });

    } catch (err) {
        next(err)
    }
};


// @desc        Requête qui affiche les évaluations pour une sous-catégorie donnée
// @route       POST /api/v1/evaluation/evaluation
// @access      Public

exports.getEvaluationGivenSousCateg = async (req, res, next) => {
    try {
        const categ = req.body.categ;

        const result = await DB.query("SELECT E.nomEvaluation FROM evaluation E WHERE E.nomCategorieP = :categP", {
            replacements: { categP: categ },
            raw: true,
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};


