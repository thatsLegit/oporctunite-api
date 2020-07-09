const ErrorResponse = require('../helper/errorResponse');
const Category_g = require('../models/Category_g');

//Controller pour les catégories (category_g)


// @desc        Get all categories
// @route       /api/v1/categories
// @access      Private
exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category_g.findAll();
        let result = categories.map(categ => categ.dataValues);
        return res.status(200).json({ success: true, count: result.length, data: result });

    } catch (err) {
        next(err);
    }
};

// @desc        Get single category
// @route       GET /api/v1/categories/:nomCategorieG
// @access      Private
exports.getCategorie = async (req, res, next) => {
    try {
        const categorie = await Category_g.findByPk(req.params.nomCategorieG);

        if (!categorie) { //wrong id error
            return next(new ErrorResponse(`Aucune catégorie trouvée avec le nom ${req.params.nomCategorieG}`, 404));
        }

        let result = categorie.dataValues;

        return res.status(200).json({ success: true, data: result });

    } catch (err) { //other error including formatting and server errs
        next(err)
    }
};