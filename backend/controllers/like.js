const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const { model } = require('../config/dbconnect');

const like = 1;
const dislike = -1;

exports.likeMessage = (req,res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    models.Message.findOne({
        where: { id: req.params.id }
    })
    .then(function(messageFound) {
        models.Like.findOne({
            where: {
                messageId: messageFound.id,
                userId: userId,
            }
        })
        .then(function(likeFound) {
            if(!likeFound){
                models.Like.create({
                    messageId: req.params.id,
                    userId: userId,
                })
                .then(function() {
                    messageFound.update({
                        likes: messageFound.likes + like
                    })
                    .then(function() {
                        res.status(201).json({ 'message' : `J'aime le Message`})
                    })
                    .catch(function(err) {
                        res.status(500).json({ 'erreur' : `Impossible de Mettre à jour le Like`, err })
                    })
                })
                .catch(function(err) {
                    res.status(500).json({ 'erreur' : `Impossible d'Aimer le Message`, err })
                })
            } else {
                res.status(400).json({ 'message' : `Message déjà like`})
            }
        })
        .catch(function(err) {
            res.status(404).json({ 'erreur' : `Like Introuvable`, err })
        })
    })
    .catch(function(err) {
        res.status(404).json({ 'erreur' : `Message Introuvable`, err })
    })
}