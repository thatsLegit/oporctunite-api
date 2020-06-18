const express = require('express');

//Include other resource routers
const bilansRouter = require('./bilans');

//Main router
const router = express.Router();

//re-routage vers bilans
router.use('/:numEleveur/bilans', bilansRouter);


module.exports = router;