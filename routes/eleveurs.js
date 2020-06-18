const express = require('express');

//Include other resource routers
const bilansRouter = require('./bilans');

//Main router
const router = express.Router();

//Re-route into other resource routers
router.use('/:numEleveur/bilans', bilansRouter);


module.exports = router;