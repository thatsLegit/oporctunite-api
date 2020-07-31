const express = require('express');
const router = express.Router();
const { getNotesCategories, getNotesCategoriesIndividuelles, getNotesSousCategories, getNotesSousCategoriesIndividuelles, getNotesEvaluations, getNotesEvaluationsIndividuelles, getAllNotes } = require('../controllers/bilans');
const { protect } = require('../middlewares/auth');


router.route('/categories').get(protect, getNotesCategories);
router.route('/categories/elevage').get(protect, getNotesCategoriesIndividuelles);

router.route('/sous-categories').get(protect, getNotesSousCategories);
router.route('/sous-categories/elevage').get(protect, getNotesSousCategoriesIndividuelles);

router.route('/evaluations').get(protect, getNotesEvaluations);
router.route('/evaluations/elevage').get(protect, getNotesEvaluationsIndividuelles);

router.route('/evaluations/all').get(protect, getAllNotes);


module.exports = router;