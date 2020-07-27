const express = require('express');
const router = express.Router();
const { getLiaison, getLiaisons } = require('../controllers/liaisons');
const { protect } = require('../middlewares/auth');


router.route('/').get(protect, getLiaisons);
router.route('/:id').get(protect, getLiaison);


module.exports = router;