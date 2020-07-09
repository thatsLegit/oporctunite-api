const express = require('express');
const router = express.Router();
const sousCategoriesRouter = require('./sousCategories'); //router des sous catégories
const { getCategorie, getCategories } = require('../controllers/categories');
const { protect } = require('../middlewares/auth');

router.route('/').get(protect, getCategories);
router.route('/:nomCategorieG').get(protect, getCategorie);

router.use('/:nomCategorieG/sousCategories', sousCategoriesRouter); //re-routage vers sous-catégories


module.exports = router;