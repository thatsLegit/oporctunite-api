const express = require('express');
const router = express.Router();
const { getNoteGlobaleCategorie, getNoteGlobaleSousCategorie, getNoteGlobaleEvaluation } = require('../controllers/bilans');



router.route('/categorie').post(getNoteGlobaleCategorie);
router.route('/sous-categorie').post(getNoteGlobaleSousCategorie);
router.route('/evaluation').post(getNoteGlobaleEvaluation);


module.exports = router;