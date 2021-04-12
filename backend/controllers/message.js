const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const { model } = require('../config/dbconnect');
const message = require('../models/message');

const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;

exports.createMessage = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    let title = req.body.title;
    let content = req.body.content;

    if (title == null || content == null) {
        return res.status(400).json({ 'erreur': `Paramètres Manquants` });
    }

    if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
        return res.status(400).json({ 'erreur': `Longueur du Titre et/ou du Contenu Trop Court` });
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound) {
        if(userFound) {
            models.Message.create({
                title: title,
                content: content,
                likes: 0,
                UserId: userFound.id
            })
            .then(function() {
                return res.status(201).json( `Message Créé avec Succès` )
            })
            .catch(function(err) {
                res.status(500).json({ 'erreur' : `Impossible de Créer le Message`, err })
            })
        } else {
            res.status(404).json({ 'erreur': `Utilisateur Introuvable`})
        }
    })
    .catch(function(err) {
        res.status(500).json({ 'erreur': `Impossible de vérifier l'utilisateur dans la BDD`, err });
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
        res.status(500).json({ 'erreur': `Impossible de vérifier l'utilisateur dans la BDD`, err });
    })
}

exports.updateMessage = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    let title = req.body.title;
    let content = req.body.content;

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
            if (messageFound.title !== title || messageFound.content !== content) {
                messageFound.update({
                    title: (title ? title : messageFound.title),
                    content: (content ? content : messageFound.content)
                })
                .then(function() {
                    res.status(201).json(`Titre/Contenu Modifié avec Succès`)
                })
                .catch(function(err) {
                    res.status(404).json({ 'erreur' : `Impossible de Mettre à Jour le Titre/Contenu du Message`, err })
                })
            } else {
                res.status(200).json( `Mise à Jour Inutile, Titre ou Contenu Identique` )
            }
        })
        .catch(function(err) {
            res.status(500).json({ 'erreur': `Recherche Messages Impossible`, err })
        })
    })
    .catch(function(err) {
        return res.status(500).json({ 'erreur' : `Impossible de vérifier l'utilisateur dans la BDD`, err })
    })
}