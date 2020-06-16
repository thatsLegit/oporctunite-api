const ErrorResponse = require('../helper/errorResponse');

/*Middleware for error handling, basically we need it to return a json error
Indeed, the default error handling tool in express render html*/

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    //Sequelize validation error 400
    if (err.name == 'SequelizeValidationError') {
        error = new ErrorResponse(Object.values(err.errors).map(val => val.message), 400);
    }

    //Server error 500
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    });
};

module.exports = errorHandler;