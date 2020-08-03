const Test = require('../models/Test');
const ErrorResponse = require('../helper/errorResponse');
const moment = require('moment');


// @desc        Get all tests
// @route       /api/v1/tests
// @access      Private
exports.getTests = async (req, res, next) => {
    try {
        const tests = await Test.findAll();
        let result = tests.map(test => test.dataValues);
        result.forEach(test => {
            test.dateT = moment(test.dateT).lang("fr").format('Do MMMM YYYY, HH:mm:ss');
        });
        return res.status(200).json({ success: true, count: result.length, data: result });

    } catch (err) {
        next(err);
    }
};

// @desc        Get single test
// @route       GET /api/v1/tests/:id
// @access      Private
exports.getTest = async (req, res, next) => {
    try {
        const test = await Test.findByPk(req.params.id);

        if (!test) { //wrong id error
            return next(new ErrorResponse(`Aucun test trouvé avec l'id ${req.params.id}`, 404));
        }

        let result = test.dataValues;
        result.dateT = moment(test.dateT).format('Do MMMM YYYY, HH:mm:ss');
        return res.status(200).json({ success: true, data: result });

    } catch (err) { //other error including formatting and server errs
        next(err)
    }
};

// @desc        create a test
// @route       /api/v1/tests
// @access      Private
exports.createTest = async (req, res, next) => {
    try {
        const test = await Test.create({
            valeur: req.body.valeur,
            numEleveur: req.elevage.numEleveur,
            nomEvaluation: req.body.nomEvaluation
        });
        return res.status(201).json({ success: true, data: test });
    } catch (err) {
        next(err);
    }
};

// @desc        Delete a test
// @route       DELETE /api/v1/tests/:id
// @access      Private
exports.deleteTest = async (req, res, next) => {
    try {
        const test = await Test.findByPk(req.params.id);

        if (!test) {
            return next(new ErrorResponse(`Aucun test trouvé avec l'id ${req.params.id}`, 404));
        }

        await Test.destroy({
            where: {
                idTest: req.params.id
            }
        });
        return res.status(200).json({ success: true });

    } catch (err) {
        next(err);
    }
};

// @desc        update a test
// @route       PUT /api/v1/tests/:id
// @access      Private
exports.updateTest = async (req, res, next) => {
    try {
        const test = await Test.findByPk(parseInt(req.params.id));

        if (!test) {
            return next(new ErrorResponse(`Aucun test trouvé avec l'id ${req.params.id}`, 404));
        }

        await test.update(req.body);
        return res.status(200).json({ success: true });

    } catch (err) {
        next(err)
    }
};