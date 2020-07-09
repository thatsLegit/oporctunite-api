const express = require('express');
const { getNoteCategorie, getNoteSousCategorie, getNoteEvaluation } = require('../controllers/bilans');
const { protect } = require('../middlewares/auth');

//mergeParams allows crossRouting
const router = express.Router({ mergeParams: true });

router.route('/categorie').get(protect, getNoteCategorie);
router.route('/sous-categorie').get(protect, getNoteSousCategorie);
router.route('/evaluation').get(protect, getNoteEvaluation);


module.exports = router;