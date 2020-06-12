const Test = require('../models/Test');
const moment = require('moment');

//Here we have all operations that are associated with the bootcamps routes


// @desc        Get all tests
// @route       /api/v1/tests
// @access      Public
exports.getTests = async (req, res, next) => {
    try {
        const tests = await Test.findAll();
        let result = tests.map(test => test.dataValues);
        result.forEach(test => {
            test.dateT = moment(test.dateT).lang("fr").format('Do MMMM YYYY, HH:mm:ss');
        });
        res.status(200).json({ success: true, count: result.length, data: result });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
    }
};

// @desc        Get single test
// @route       GET /api/v1/tests/id
// @access      Public
exports.getTest = async (req, res, next) => {
    try {
        const test = await Test.findByPk(req.params.id);
        let result = test.dataValues;
        result.dateT = moment(test.dateT).format('Do MMMM YYYY, HH:mm:ss');
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
    }
};

// @desc        create a test
// @route       /api/v1/tests
// @access      Public
exports.createTest = async (req, res, next) => {
    try {
        const test = await Test.create(req.body);
        res.status(201).json({ success: true, data: test });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

// @desc        Delete a test
// @route       DELETE /api/v1/tests/id
// @access      Public
exports.deleteTest = async (req, res, next) => {
    try {
        await Test.destroy({
            where: {
                idTest: req.params.id
            }
        })
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
    }
};

// @desc        update a test
// @route       PUT /api/v1/tests/id
// @access      Public
exports.updateTest = async (req, res, next) => {
    try {
        const test = await Test.findByPk(parseInt(req.params.id));

        if (!test) {
            res.status(404).json({ success: false });
        }

        await test.update(req.body);
        res.status(200).json({ success: true });

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
    }
};