const express = require('express');
const { getSousCategories, getEvaluations} = require('../controllers/evaluation');

//mergeParams allows crossRouting
const router = express.Router({ mergeParams: true });

router.route('/sous-categorie').post(getSousCategories);
router.route('/evaluation').post(getEvaluations);

module.exports = router;