const ErrorResponse = require('../helper/errorResponse');
const Category_p = require('../models/Category_p');

//Ce controller permet de d'afficher les sous-catégories à partir d'une catégorie, ainsi que des réaliser les opérations GET basiques sur les sous catégories


// @desc        Get all category_p
// @route       /api/v1/sousCategories
// @access      Public
exports.getSousCategories = async (req, res, next) => {
    try {
        const sousCategorie = await Category_p.findAll();
        let result = sousCategorie.map(sousCateg => sousCateg.dataValues);

        return res.status(200).json({ success: true, count: result.length, data: result });

    } catch (err) {
        next(err);
    }
};

// @desc        Get single category_p
// @route       GET /api/v1/sousCategories/:nomCategorieP
// @access      Public
exports.getSousCategorie = async (req, res, next) => {
    try {
        const sousCategorie = await Category_p.findByPk(req.params.nomCategorieP);

        if (!sousCategorie) { //wrong id error
            return next(new ErrorResponse(`Aucune sous-catégorie trouvée avec le nom ${req.params.nomCategorieP}`, 404));
        }

        let result = sousCategorie.dataValues;

        return res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err)
    }
};

// @desc        Requête qui affiche les sous-catégories pour une catégorie donnée
// @route       GET /api/v1/:nomCategorieG/sousCategories/categorie
// @access      Public

exports.getSousCategoriesGivenCateg = async (req, res, next) => {
    try {
        const categ = req.params.nomCategorieG;

        const result = await Category_p.findAll({
            where: {
                nomCategorieG: categ
            }
        });

        res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err);
    }
};