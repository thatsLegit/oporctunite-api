const express = require('express');
const router = express.Router();
const { getEvaluation, getEvaluations, createEvaluation, deleteEvaluation, updateEvaluation } = require('../controllers/evaluations');


router.route('/').get(getEvaluations).post(createEvaluation);
router.route('/:mot').get(getEvaluations);
router.route('/:nomEvaluation').get(getEvaluation).delete(deleteEvaluation).put(updateEvaluation);


module.exports = router;