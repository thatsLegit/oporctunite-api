const express = require('express');
const router = express.Router();
const { getFavoris, createFavoris, deleteFavoris, getAllFavoris } = require('../controllers/favoris');
const { protect } = require('../middlewares/auth');

router.route('/:titreFiche').get(protect, getFavoris).delete(protect, deleteFavoris);
router.route('/').get(protect, getAllFavoris).post(protect, createFavoris);


module.exports = router;