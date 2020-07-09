const express = require('express');
const { getEvaluation, getEvaluations, createEvaluation, deleteEvaluation, updateEvaluation, getEvaluationGivenSousCateg } = require('../controllers/evaluations');
const { protect } = require('../middlewares/auth');

//mergeParams allows crossRouting
const router = express.Router({ mergeParams: true });


router.route('/').get(protect, getEvaluations).post(protect, createEvaluation);
router.route('/sousCategorie').get(protect, getEvaluationGivenSousCateg);
router.route('/search/:mot').get(protect, getEvaluations);
router.route('/:nomEvaluation').get(protect, getEvaluation);


module.exports = router;