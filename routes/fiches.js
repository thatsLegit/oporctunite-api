const express = require('express');
const { getFiche, getFiches, getFichesGivenCategory } = require('../controllers/fiches');
const { protect } = require('../middlewares/auth');

//mergeParams allows crossRouting
const router = express.Router({ mergeParams: true });

router.route('/').get(protect, getFiches);
router.route('/categorie').get(protect, getFichesGivenCategory);
router.route('/:titreFiche').get(protect, getFiche);



module.exports = router;