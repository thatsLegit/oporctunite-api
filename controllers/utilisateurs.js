const ErrorResponse = require('../helper/errorResponse');
const Utilisateur = require('../models/Utilisateur');
const path = require('path');


// @desc        Upload photo after subscription
// @route       PUT /api/v1/utilisateurs/photos/:id
// @access      Private
exports.utilisateurPhotoUpload = async (req, res, next) => {
    const utilisateur = await Utilisateur.findByPk(req.params.id);

    if (!utilisateur) {
        return next(new ErrorResponse(`Aucun utilisateur trouvé avec l'id ${req.params.id}`, 404));
    }

    //Check if there's a file uploaded
    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    //Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload a photo`, 400));
    }

    //Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Veuillez uploader une image de moins de ${process.env.MAX_FILE_UPLOAD} MB`, 400));
    }

    //Create custom file name
    file.name = req.params.id + path.parse(file.name).ext;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.err(error);
            return next(new ErrorResponse(`Problem with the uploads`, 500));
        }
        await utilisateur.update({ ...utilisateur, utilisateurPhoto: file.name });

        res.status(200).json({
            success: true,
            data: file.name
        });
    });
};