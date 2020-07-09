const express = require('express');
const router = express.Router();
const { getTests, createTest, getTest, deleteTest, updateTest } = require('../controllers/tests');
const { protect } = require('../middlewares/auth');


router.route('/').get(protect, getTests).post(protect, createTest);
router.route('/:id').get(protect, getTest).delete(protect, deleteTest).put(protect, updateTest);


module.exports = router;