const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.createComment = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    let content = req.body.content;

    if (userId < 0) {
        return res.status(403).json({ 'erreur': 'Token incorrect' })
    }
    
    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound) {
        models.Message.findOne({
            where: { id: req.params.id }
        })
        .then(function(messageFound) {
            models.Comment.create({
                messageId: messageFound.id,
                userId: userFound.id,
                username: userFound.username,
                content: content,
            })
            .then(function() {
                return res.status(201).json({ 'message' : `Commentaire Créé avec Succès` })
            })
            .catch(function(err) {
                res.status(500).json({ 'erreur' : `Impossible de Créer le Commentaire`, err })
            })
        })
        .catch(function(err) {
            res.status(500).json({ 'erreur' : `Impossible de Trouver le Message`, err })
        })
    })
    .catch(function(err) {
        res.status(500).json({ 'erreur': `Impossible de Vérifier l'Utilisateur dans la BDD`, err });   
    })
}