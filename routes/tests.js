const express = require('express');
const router = express.Router();
const { getTests, createTest, getTest, deleteTest, updateTest } = require('../controllers/tests');



router.route('/').get(getTests).post(createTest);
router.route('/:id').get(getTest).delete(deleteTest).put(updateTest);


module.exports = router;