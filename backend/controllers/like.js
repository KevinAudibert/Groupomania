const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');

const DISLIKED = 0;
const LIKED = 1

exports.likePost = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    let messageId = parseInt(req.params.messageId);

    if (messageId <= 0) {
        return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
        function(done) {
            models.Message.findOne({
                where: { id: messageId }
            })
            .then(function(messageFound) {
                done(null, messageFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'impossible de récuperer ID du message', err });
            })
        },
        function(messageFound, done) {
            if(messageFound) {
                models.User.findOne({
                    where: { id: userId }
                })
                .then(function(userFound) {
                    done(null, messageFound, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'impossible de récuperer ID utilisateur', err });
                })
            } else {
                res.status(404).json({ 'error': 'message inexistant' });
            }
        },
        function(messageFound, userFound, done) {
            if(userFound) {
                models.Like.findOne({
                    where: {
                        userId: userId,
                        messageId: messageId
                    }
                })
                .then(function(userAlreadyLikedFound) {
                    done(null, messageFound, userFound, userAlreadyLikedFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify is user already liked', err });
                })
            } else {
                res.status(404).json({ 'error': 'utilisateur inexistant' });
            }
        },
        function(messageFound, userFound, userAlreadyLikedFound, done) {
            if(!userAlreadyLikedFound) {
                messageFound.addUser(userFound, { isLike: LIKED })
                .then(function() {
                    done(null, messageFound, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'message': 'impossible de prendre en compte like utilisateur', err });
                });
            } else {
                if (userAlreadyLikedFound.isLike === DISLIKED) {
                    userAlreadyLikedFound.update({
                        isLike: LIKED,
                    })
                    .then(function() {
                        done(null, messageFound, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'impossible de mettre à jour le like utilisateur', err });
                    });
                } else {
                    return res.status(409).json({ 'error': 'message déjà liked' })
                }
            }
        },
        function(messageFound, done) {
            messageFound.update({
                likes: messageFound.likes + 1,
            })
            .then(function() {
                done(messageFound)
            })
            .catch(function(err) {
                return res.status(500).json({ 'error' :' impossible de faire le décompte du nombre de like', err });
            })
        }
    ], function(messageFound) {
        if (messageFound) {
          return res.status(201).json(messageFound);
        } else {
          return res.status(500).json({ 'error': 'cannot update message' });
        }
      });
},

exports.dislikePost = (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    let messageId = parseInt(req.params.messageId);

    if (messageId <= 0) {
        return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
        function(done) {
            models.Message.findOne({
                where: { id: messageId }
            })
            .then(function(messageFound) {
                done(null, messageFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify message', err });
            })
        },
        function(messageFound, done) {
            if(messageFound) {
                models.User.findOne({
                    where: { id: userId }
                })
                .then(function(userFound) {
                    done(null, messageFound, userFound)
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user', err });
                })
            } else {
                res.status(404).json({ 'error': 'post already liked' });
            }
        },
        function(messageFound, userFound, done) {
            if(userFound) {
                models.Like.findOne({
                    where: {
                        userId: userId,
                        messageId: messageId
                    }
                })
                .then(function(userAlreadyLikedFound) {
                    done(null, messageFound, userFound, userAlreadyLikedFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify is user already liked', err });
                })
            } else {
                return res.status(404).json({ 'error': 'user not exist' });
            }
        },
        function(messageFound, userFound, userAlreadyLikedFound, done) {
            if(!userAlreadyLikedFound) {
                messageFound.addUser(userFound, { isLike: DISLIKED })
                .then(function() {
                    done(null, messageFound, userFound)
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to set user reaction', err })
                });
            } else {
                if (userAlreadyLikedFound.isLike === LIKED) {
                    userAlreadyLikedFound.update({
                        isLike: DISLIKED,
                    })
                    .then(function() {
                        done(null, messageFound, userFound)
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'cannot update user reaction', err })
                    })
                } else {
                    return res.status(409).json({ 'error': 'message already disliked' })
                }
            }
        },
        function(messageFound, done) {
            messageFound.update({
                likes: messageFound.likes - 1,
            })
            .then(function() {
                done(messageFound)
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'cannot update message like counter', err })
            })
        },
    ], function(messageFound) {
        if (messageFound) {
            return res.status(201).json(messageFound);
        } else {
            return res.status(500).json({ 'error': 'cannot update message' })
        }
    })
}
