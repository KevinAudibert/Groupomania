const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const { model } = require('../config/dbconnect');

exports.likeMessage = (req,res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound) {
        models.Message.findOne({
            where: {
                userId: userFound.id,
                id: req.params.id
            }
        })
        .then(function(messageFound) {
            if (messageFound !== null) {
                messageFound.addUser(userId, { isLike: LIKED})
                .then(function() {

                })
            } else {
                res.status(404).json({ 'message' : `Message introuvable`})
            }
        })
        .catch(function(err) {
            res.status(500).json({ 'erreur': `Recherche Messages Impossible`, err })
        })
    })
    .catch(function(err) {
        return res.status(500).json({ 'erreur' : `Impossible de Vérifier l'Utilisateur dans la BDD`, err })
    })
}