const Liaison = require('../models/Liaison');
const ErrorResponse = require('../helper/errorResponse');


// @desc        Get all liaisons
// @route       /api/v1/liaisons
// @access      Private
exports.getLiaisons = async (req, res, next) => {
    try {
        const liaisons = await Liaison.findAll();
        let result = liaisons.map(liaison => liaison.dataValues);

        return res.status(200).json({ success: true, count: result.length, data: result });

    } catch (err) {
        next(err);
    }
};

// @desc        Get single liaison
// @route       GET /api/v1/liaisons/:id
// @access      Private
exports.getLiaison = async (req, res, next) => {
    try {
        const liaison = await Liaison.findByPk(req.params.id);

        if (!liaison) { //wrong id error
            return next(new ErrorResponse(`Aucune liaison trouvée avec l'id ${req.params.id}`, 404));
        }

        let result = liaison.dataValues;
        return res.status(200).json({ success: true, data: result });

    } catch (err) { //other error including formatting and server errs
        next(err)
    }
};