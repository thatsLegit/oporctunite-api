const express = require('express');
const { getNoteCategorie, getNoteSousCategorie, getNoteEvaluation } = require('../controllers/bilans');

//mergeParams allows crossRouting
const router = express.Router({ mergeParams: true });

router.route('/categorie').post(getNoteCategorie);
router.route('/sous-categorie').post(getNoteSousCategorie);
router.route('/evaluation').post(getNoteEvaluation);


module.exports = router;