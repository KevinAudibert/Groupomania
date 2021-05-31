const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.createComment = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    let content = req.body.content;

    if (userId < 0) {
        return res.status(403).json({ 'erreur': 'Token incorrect' })
    }

    if (content.length == '') {
        return res.status(400).json({ 'erreur': `Commentaire Manquant` });
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

exports.listCommentUserId = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(403).json({ 'erreur': 'Token incorrect' })
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound) {
            models.Comment.findAll({
                where: {
                    userId: userFound.id
                }
            })
            .then(function(allCommentUser) {
                if (!allCommentUser.length == 0) {
                    res.status(200).json(allCommentUser)
                } else {
                    res.status(404).json({ 'erreur': `Aucuns Commentaires Trouvés` });
                }
            })
            .catch(function(err) {
                res.status(500).json({ 'erreur': `Recherche Commentaire Impossible`, err })
            })
    })
    .catch(function(err) {
        res.status(500).json({ 'erreur': `Impossible de Vérifier l'Utilisateur dans la BDD`, err });
    })
}

exports.deleteComment = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(403).json({ 'erreur': 'Token incorrect' })
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound) {
        models.Comment.findOne({
            where: {
                userId: userFound.id,
                id: req.params.id
            }
        })
        .then(function(commentFound) {
                models.Comment.destroy({
                    where: {
                        id: commentFound.id
                    }
                })
                .then(function() {
                    return res.status(201).json({ 'message' : 'Commentaire Supprimé avec Succès' })
                })
                .catch(function(err) {
                    return res.status(404).json({ 'erreur' : `Impossible de Supprimer le Commentaire`, err }) 
                })
            })
        .catch(function(err) {
            return res.status(500).json({ 'erreur' : `Impossible de Trouver le Commentaire`, err })  
        })              
    })
    .catch(function(err) {
        return res.status(500).json({ 'erreur' : `Impossible de Vérifier l'Utilisateur dans la BDD`, err })        
    })
}

exports.allCommentMessage = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(403).json({ 'erreur': 'Token incorrect' })
    }
   
    models.User.findOne({
        where: { id: userId }
    })
    .then(function() {
        models.Message.findOne({
            where: { id: req.params.id }
        })
        .then(function(messageFound) {
            models.Comment.findAll({
                where: { messageId: messageFound.id}
            })
            .then(function(commentFound) {
                if (!commentFound.length == 0) {
                    res.status(200).json(commentFound)
                } else {
                    res.status(404).json({ 'message': `Aucuns Commentaires Trouvés pour ce Message` });
                }
            })
            .catch(function(err) {
                res.status(500).json({ 'erreur' : `Recherche Commentaire Impossible`, err })
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