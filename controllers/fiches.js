const ErrorResponse = require('../helper/errorResponse');
const Fiche = require('../models/Fiche');


// @desc        Get all fiches
// @route       /api/v1/fiches
// @access      Private
exports.getFiches = async (req, res, next) => {
    try {
        const fiches = await Fiche.findAll();
        let result = fiches.map(fiche => fiche.dataValues);

        return res.status(200).json({ success: true, count: result.length, data: result });

    } catch (err) {
        next(err);
    }
};

// @desc        Get single fiche
// @route       GET /api/v1/fiches/:titreFiche
// @access      Private
exports.getFiche = async (req, res, next) => {
    try {
        const fiche = await Fiche.findByPk(req.params.titreFiche);

        if (!fiche) { //wrong id error
            return next(new ErrorResponse(`Aucune fiche trouvée avec le titre ${req.params.titreFiche}`, 404));
        }

        let result = fiche.dataValues;

        return res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err)
    }
};

// @desc        Requête qui affiche les fiches appartenant à une catégorie donnée
// @route       GET /api/v1/:nomCategorieG/fiches/categorie
// @access      Private

exports.getFichesGivenCategory = async (req, res, next) => {
    try {
        const categ = req.params.nomCategorieG;

        const result = await Fiche.findAll({
            where: {
                nomCategorieG: categ
            }
        });

        res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};