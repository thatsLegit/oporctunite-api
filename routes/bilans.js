const express = require('express');
const { getNoteCategorie, getNoteSousCategorie, getNoteEvaluation } = require('../controllers/bilans');

//mergeParams allows crossRouting
const router = express.Router({ mergeParams: true });

router.route('/categorie').get(getNoteCategorie);
router.route('/sous-categorie').get(getNoteSousCategorie);
router.route('/evaluation').get(getNoteEvaluation);


module.exports = router;