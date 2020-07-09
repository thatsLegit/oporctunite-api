const jwt = require('jsonwebtoken');
const ErrorResponse = require('../helper/errorResponse');
const Utilisateur = require('../models/Utilisateur');
const Elevage = require('../models/Elevage');


//Protect routes
exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        //Make sure token exists
        if (!token) {
            return next(new ErrorResponse(`Accès non autorisé`, 401));
        }

        //verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.utilisateur = await Utilisateur.findByPk(decoded.idutilisateur); //Currently logged in user
            req.elevage = await Elevage.findOne({ where: { idutilisateur: decoded.idutilisateur } });
            next();
        } catch (error) {
            return next(new ErrorResponse(`Accès non autorisé`, 401));
        }
    } catch (err) {
        next(err);
    }
};