const ErrorResponse = require('../helper/errorResponse');
const DB = require('../config/db');
const Sequelize = require('sequelize');
const Utilisateur = require('../models/Utilisateur');
const Elevage = require('../models/Elevage');


// @desc        Login user
// @route       POST /api/v1/auth/login
// @access      Public
exports.login = async (req, res, next) => {
    try {
        const { email, password, type_utilisateur } = req.body;

        if (!email || !password) {
            return next(new ErrorResponse(`Accès securisé, veuillez renseigner un identifiant et un mot de passe`, 400));
        }

        const utilisateur = await Utilisateur.findOne({ where: { email: email } });

        if (!utilisateur) {
            return next(new ErrorResponse(`Identifiants incorrects`, 401));
        }

        const isMatch = utilisateur.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse(`Identifiants incorrects`, 401));
        }

        if (type_utilisateur == 'elevage') {
            const idutilisateur = utilisateur.idutilisateur;
            const elevage = await Elevage.findOne({ where: { idutilisateur: idutilisateur } });
            const token = utilisateur.getSignedJwtToken(elevage.numEleveur);

            return res.status(200).json({ success: true, token });
        };

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