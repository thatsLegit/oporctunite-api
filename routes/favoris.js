const express = require('express');
const router = express.Router();
const { getFavoris, createFavoris, deleteFavoris } = require('../controllers/favoris');
const { protect } = require('../middlewares/auth');

router.route('/:titreFiche').get(protect, getFavoris).delete(protect, deleteFavoris);
router.route('/').get(protect, createFavoris);


module.exports = router;