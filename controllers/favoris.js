const ErrorResponse = require('../helper/errorResponse');
const Favoris = require('../models/Favoris');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// @desc        Get all favories by user
// @route       GET /api/v1/favoris
// @access      Private
exports.getAllFavoris = async (req, res, next) => {
    try {
        const id = req.utilisateur.idutilisateur;
        const favoris = await Favoris.findAll({
            where: {
                idutilisateur: id
            }
        });

        if (!favoris) { //wrong id error
            return next(new ErrorResponse(`Aucune fiche favorite trouvée pour l'id ${id}`, 404));
        }

        let result = favoris.map(fav => fav.dataValues);

        return res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err)
    }
};

// @desc        Get single favoris by titreFiche
// @route       GET /api/v1/favoris/:titreFiche
// @access      Private
exports.getFavoris = async (req, res, next) => {
    try {
        const titre = req.params.titreFiche.replace('+', ' ');
        const id = req.utilisateur.idutilisateur;
        const favoris = await Favoris.findOne({
            where: {
                [Op.and]: [{ titreFiche: titre }, { idutilisateur: id }]
            }
        });

        if (!favoris) { //wrong id error
            return next(new ErrorResponse(`Aucune fiche favorite trouvé avec le titre ${titre} et l'id ${id}`, 404));
        }

        let result = favoris.dataValues;

        return res.status(200).json({ success: true, data: result });

    } catch (err) {
        next(err)
    }
};

// @desc        create a favoris
// @route       /api/v1/favoris
// @access      Private
exports.createFavoris = async (req, res, next) => {
    try {
        const favoris = await Favoris.create({
            idutilisateur: req.utilisateur.idutilisateur,
            titreFiche: req.body.titreFiche
        });

        return res.status(201).json({ success: true, data: favoris });
    } catch (err) {
        next(err)
    }
};

// @desc        delete a favoris
// @route       DELETE /api/v1/favoris/:titreFiche
// @access      Private

exports.deleteFavoris = async (req, res, next) => {
    try {
        const titre = req.params.titreFiche.replace(/\+/g, ' ');
        const id = req.utilisateur.idutilisateur;
        const favoris = await Favoris.findOne({
            where: {
                [Op.and]: [{ titreFiche: titre }, { idutilisateur: id }]
            }
        });

        if (!favoris) { //wrong id error
            return next(new ErrorResponse(`Aucune fiche favorite trouvé avec le titre ${titre} et l'id ${id}`, 404));
        }

        await Favoris.destroy({
            where: {
                [Op.and]: [{ titreFiche: titre }, { idutilisateur: id }]
            }
        });

        return res.status(200).json({ success: true });

    } catch (err) {
        next(err);
    }
};