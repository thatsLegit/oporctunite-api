const express = require('express');
const { getEvaluation, getEvaluations, createEvaluation, deleteEvaluation, updateEvaluation, getEvaluationGivenSousCateg } = require('../controllers/evaluations');

//mergeParams allows crossRouting
const router = express.Router({ mergeParams: true });


router.route('/').get(getEvaluations).post(createEvaluation);
router.route('/sousCategorie').get(getEvaluationGivenSousCateg);
router.route('/search/:mot').get(getEvaluations);
router.route('/:nomEvaluation').get(getEvaluation);


module.exports = router;