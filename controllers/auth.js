const ErrorResponse = require('../helper/errorResponse');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Utilisateur = require('../models/Utilisateur');
const Elevage = require('../models/Elevage');


// @desc        Login user
// @route       POST /api/v1/auth/login
// @access      Public
exports.login = async (req, res, next) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return next(new ErrorResponse(`Accès securisé, veuillez renseigner un identifiant et un mot de passe`, 400));
        }

        const utilisateur = await Utilisateur.findOne({
            where: {
                [Op.or]: [{ email: login }, { telephone: login }]
            }
        });

        if (!utilisateur) {
            return next(new ErrorResponse(`Identifiants incorrects`, 401));
        }

        const isMatch = utilisateur.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse(`Identifiants incorrects`, 401));
        }

        const token = utilisateur.getSignedJwtToken();
        return res.status(200).json({ success: true, token });

    } catch (err) {
        next(err);
    }
};

// @desc        Register user
// @route       POST /api/v1/auth/register
// @access      Public
exports.register = async (req, res, next) => {
    const { email, telephone, ville, codePostal, adresse, password, utilisateurPhoto, type_utilisateur, numEleveur, nomElevage, tailleElevage } = req.body;

    //Creer l'utilisateur
    const utilisateur = await Utilisateur.create({
        email,
        telephone,
        ville,
        codePostal,
        adresse,
        password,
        utilisateurPhoto,
        type_utilisateur
    });

    const idutilisateur = utilisateur.idutilisateur;

    if (type_utilisateur == 'elevage') {
        //Creer l'elevage
        await Elevage.create({
            numEleveur,
            nomElevage,
            tailleElevage,
            idutilisateur
        });
    }

    //upload photo


    //authenticate
    const token = utilisateur.getSignedJwtToken();
    return res.status(200).json({ success: true, token });
};

// @desc        Get current logged in user
// @route       GET /api/v1/auth/me
// @access      Private
exports.getMe = async (req, res, next) => {
    res.status(200).json({
        success: true,
        utilisateur: req.utilisateur,
        elevage: req.elevage
    });
};