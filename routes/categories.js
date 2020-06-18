const express = require('express');
const router = express.Router();
const sousCategoriesRouter = require('./sousCategories'); //router des sous catégories
const { getCategorie, getCategories } = require('../controllers/categories');


router.route('/').get(getCategories);
router.route('/:nomCategorieG').get(getCategorie);

router.use('/:nomCategorieG/sousCategories', sousCategoriesRouter); //re-routage vers sous-catégories


module.exports = router;