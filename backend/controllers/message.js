const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs')
const { model } = require('../config/dbconnect');

const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;

function deleteImg(path) {
    
}

exports.createMessage = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    let title = req.body.title;
    let content = req.body.content;

    if (title == '' || content == '') {
        if(req.file != undefined) {
            let imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            let imageName = imageUrl.split('/images/')[1]
            fs.unlinkSync(`images/${imageName}`)
        }
        return res.status(400).json({ 'erreur': `Paramètres Manquants` });
    }

    if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
        return res.status(400).json({ 'erreur': `Longueur du Titre et / ou du Contenu Trop Court` });
    }
    
    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound) {
        if(req.file == undefined) {
            return models.Message.create({
                title: title,
                content: content,
                images: null,
                likes: 0,
                UserId: userFound.id
            })
            .then(function() {
                return res.status(201).json({ 'message' : `Message Créé avec Succès` })
            })
            .catch(function(err) {
                res.status(500).json({ 'erreur' : `Impossible de Créer le Message`, err })
            })
        } else {
            return models.Message.create({
                title: title,
                content: content,
                images: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
                likes: 0,
                UserId: userFound.id
            })
            .then(function() {
                return res.status(201).json({ 'message' : `Message avec Image Créé avec Succès` })
            })
            .catch(function(err) {
                res.status(500).json({ 'erreur' : `Impossible de Créer le Message`, err })
            })
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'erreur': `Impossible de Vérifier l'Utilisateur dans la BDD`, err });
    })
}

exports.listMessage = (req, res) => {
    let fields = req.query.fields;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
    let order = req.query.order;

    if (limit > ITEMS_LIMIT) {
        limit = ITEMS_LIMIT;
    }

    models.Message.findAll({
        order: [(order != null) ? order.split(':') : ['title', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        /*include: [{
            model: models.User,
            attributes: [ 'username' ]
        }]*/
    })
    .then(function(messages) {
        if (messages) {
            res.status(200).json(messages);
        } else {
            res.status(404).json({ 'erreur': `Aucuns Messages Trouvés` });
        }
    })
    .catch(function(err) {
        res.status(500).json({ 'erreur' : `Champs Invalides`, err });
    })
}

exports.listMessageUserId = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound) {
            models.Message.findAll({
                where: {
                    userId: userFound.id
                }
            })
            .then(function(allMessageUser) {
                if (!allMessageUser.length == 0) {
                    res.status(200).json(allMessageUser)
                } else {
                    res.status(404).json({ 'erreur': `Aucuns Messages Trouvés` });
                }
            })
            .catch(function(err) {
                res.status(500).json({ 'erreur': `Recherche Messages Impossible`, err })
            })
    })
    .catch(function(err) {
        res.status(500).json({ 'erreur': `Impossible de Vérifier l'Utilisateur dans la BDD`, err });
    })
}

exports.updateMessage = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    let title = req.body.title;
    let content = req.body.content;

    if (title == '' || content == '') {
        return res.status(400).json({ 'erreur': `Paramètres Manquants` });
    }
    if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
        return res.status(400).json({ 'erreur': `Longueur du Titre et / ou du Contenu Trop Court` });
    }

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
            if(messageFound != null) {
                messageFound.update({
                    title: title,
                    content: content
                })
                .then(function(messageUpdate) {
                    res.status(201).json({ 'message' : `Message Modifié avec Succès`, messageUpdate })
                })
                .catch(function(err) {
                    res.status(500).json({ 'erreur' : `Impossible de Mettre à Jour le Message`, err})
                })
            } else {
                return res.status(404).json({ 'message' : `Message Non Trouvé pour l'Utilisateur` })
            }
        })
        .catch(function(err) {
            res.status(500).json({ 'erreur' : `Impossible de Trouver l'Utilisateur`, err })
        })
    })
    .catch(function(err) {
        res.status(500).json({ 'erreur': `Impossible de Vérifier l'Utilisateur dans la BDD`, err });
    })
}

exports.getOneMessageUserId = (req, res) => {
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
                res.status(201).json(messageFound)
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

exports.deleteMessage = (req, res) => {
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
            models.Message.destroy({
                where: {
                    id: messageFound.id
                }
            })
            .then(function() {
                return res.status(201).json({ 'message' : 'Message Supprimé avec Succès' })
            })
            .catch(function(err) {
                return res.status(404).json({ 'erreur' : `Impossible de Supprimer le Message`, err }) 
            })
        })
        .catch(function(err) {
            return res.status(404).json({ 'erreur' : `Impossible de Trouver le Message`, err })  
        })              
    })
    .catch(function(err) {
        return res.status(500).json({ 'erreur' : `Impossible de Vérifier l'Utilisateur dans la BDD`, err })        
    })
}