const express = require('express');
const { utilisateurPhotoUpload } = require('../controllers/utilisateurs');
const router = express.Router();


router.route('/:id').put(utilisateurPhotoUpload);


module.exports = router;