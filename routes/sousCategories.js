const express = require('express');
const { getSousCategories, getSousCategorie, getSousCategoriesGivenCateg } = require('../controllers/sousCategories');
const evaluationsRouter = require('./evaluations');
const { protect } = require('../middlewares/auth');

//mergeParams allows crossRouting
const router = express.Router({ mergeParams: true });


router.route('/').get(protect, getSousCategories);
router.route('/categorie').get(protect, getSousCategoriesGivenCateg); //Routes dans cet ordre sinon clash
router.use('/:nomCategorieP/evaluations', evaluationsRouter); //re-routage vers évaluations
router.route('/:nomCategorieP').get(protect, getSousCategorie);



module.exports = router;