const express = require('express');
const { getSousCategories, getSousCategorie, getSousCategoriesGivenCateg } = require('../controllers/sousCategories');
const evaluationsRouter = require('./evaluations');

//mergeParams allows crossRouting
const router = express.Router({ mergeParams: true });


router.route('/').get(getSousCategories);
router.route('/categorie').get(getSousCategoriesGivenCateg); //Routes dans cet ordre sinon clash
router.use('/:nomCategorieP/evaluations', evaluationsRouter); //re-routage vers évaluations
router.route('/:nomCategorieP').get(getSousCategorie);



module.exports = router;