const express = require('express');
const router = express.Router();
const sousCategoriesRouter = require('./sousCategories'); //router des sous catégories
const fichesRouter = require('./fiches'); //router des fiches
const { getCategorie, getCategories } = require('../controllers/categories');
const { protect } = require('../middlewares/auth');

router.route('/').get(protect, getCategories);
router.route('/:nomCategorieG').get(protect, getCategorie);

router.use('/:nomCategorieG/sousCategories', sousCategoriesRouter); //re-routage vers sous-catégories
router.use('/:nomCategorieG/fiches', fichesRouter); //re-routage vers fiches


module.exports = router;