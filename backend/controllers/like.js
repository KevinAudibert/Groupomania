const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const { model } = require('../config/dbconnect');

const like = 1;
const unLike = -1;

exports.likeMessage = (req,res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(403).json({ 'erreur': 'Token incorrect' })
    }

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
                console.log(userId)
                console.log(req.params.id)
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
                        res.status(400).json({ 'erreur' : `Impossible de Mettre à jour le Like`, err })
                    })
                })
                .catch(function(err) {
                    res.status(500).json({ 'erreur' : `Impossible d'Aimer le Message`, err })
                })
            } else {
                likeFound.destroy()
                .then(function() {
                    messageFound.update({
                        likes: messageFound.likes + unLike
                    })
                    .then(function() {
                        res.status(201).json({ 'message' : `Je n'aime plus le Message`})
                    })
                    .catch(function(err) {
                        res.status(400).json({ 'erreur' : `Impossible de Mettre à jour le Like`, err })
                    })
                })
                .catch(function(err) {
                    res.status(500).json({ 'erreur' : `Impossible de ne plus Aimer le Message`, err })
                })
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