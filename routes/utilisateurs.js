const express = require('express');
const { utilisateurPhotoUpload, updateUserData } = require('../controllers/utilisateurs');
const { protect } = require('../middlewares/auth');
const router = express.Router();


router.route('/userData').put(protect, updateUserData);
router.route('/:id').put(utilisateurPhotoUpload);


module.exports = router;