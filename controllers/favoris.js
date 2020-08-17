const ErrorResponse = require('../helper/errorResponse');
const Favoris = require('../models/Favoris');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// @desc        Get single favoris by titreFiche
// @route       GET /api/v1/favoris/:titreFiche
// @access      Private
exports.getFavoris = async (req, res, next) => {
    try {
        const titre = req.params.titreFiche;
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
        const favoris = await Favoris.create(req.body);

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
        const titre = req.params.titreFiche;
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