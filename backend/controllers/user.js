const bcrypt = require('bcrypt');
const fs = require('fs');
const validator = require('validator');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const { model } = require('../config/dbconnect');
const { response } = require('express');

const userNameMinLimit = 2
const userNameMaxLimit = 16

//Fonction supprimant toutes les Iimages de l'utilisateur
function deleteImg(userId) {
    models.Message.findAll({
        attributes: ['images'],
        where: { userId: userId }
    })
    .then(function(allMessages) {
        for (let message of allMessages) {
            let filename = message.images.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                console.log('Les Images ont bien été Supprimées')
            })
        }
    })
    .catch(function(err) {
        res.status(404).json({ 'erreur' : `Aucune images Trouvées pour l'utilisateur`, err })
    })
}

exports.signup = (req, res) => {

    //PARAMS
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let bio = req.body.bio;

    if (username.length >= userNameMaxLimit || username.length <= userNameMinLimit) {
        return res.status(400).json({ 'erreur': `Mauvais Nom d'Utilisateur (Caractères requis entre 3 et 17)` })
    } if (!validator.isEmail(email) || email == null) {
        return res.status(400).json({ 'erreur': `Format d'Adresse Email Non Valide ou Manquante` })
    } if (!validator.isStrongPassword(password) || password == null) {
        return res.status(400).json({ 'erreur': `Format du Mot de Passe Non Valide ou Manquant` });
    }

    models.User.findOne({
        attributes: ['email'],
        where:  { email: email }
    })
    .then(function(userFound) {
        if (!userFound) {
            bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                let newUser = models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    bio: bio,
                    isAdmin: 0
                })
                .then(function(newUser) {
                    return res.status(201).json({
                        'userId': newUser.id
                    })
                })
                .catch(function(err) {
                    res.status(400).json({ 'erreur' : `Impossible de Créer un Utilisateur`, err })
                })
            })
        } else {
            return res.status(409).json({ 'erreur' : `L'utilisateur existe déjà dans la BDD` })
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'erreur' : `Impossible de vérifier l'utilisateur dans la BDD`, err })
    })
}

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({ 'erreur': `Paramètres Manquants` });
    }

    models.User.findOne({
        where: { email: email }
    })
    .then(function(userFound) {
        if(userFound) {
            bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                if(resBycrypt) {
                    return res.status(200).json({
                        'userId': userFound.id,
                        'token': jwtUtils.generateTokenForUser(userFound)
                    })
                } else {
                    return res.status(403).json({ 'erreur': `Mot de Passe incorrect`})
                }
            })
        } else {
            return res.status(409).json({ 'erreur' : `L'utilisateur n'existe pas dans la BDD` })
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'erreur' : `Impossible de vérifier l'utilisateur dans la BDD`, err })
    })
}  

exports.getUserProfile = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Token incorrect' })
    }

    models.User.findOne({
        attributes: [ 'id', 'email', 'username', 'bio', 'avatar', 'isAdmin' ],
        where: { id: userId }
    })
    .then(function(user) {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(409).json({ 'erreur': `L'utilisateur n'est pas trouvé dans la BDD` })
        }
    })
    .catch(function(err) {
        res.status(500).json({ 'erreur': `Impossible de vérifier l'utilisateur dans la BDD`, err });
    })
}

exports.getAllUser = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Token incorrect' })
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound) {
        if(userFound.isAdmin == true) {
            models.User.findAll()
            .then(function(allUsers) {
                res.status(200).json(allUsers);
            })
            .catch(function(err) {
                res.status(404).json({ 'erreur': `Aucuns Utilisateurs Trouvés`, err });
            })
        } else {
            return res.status(403).json({ 'erreur': 'Utilisateur non Administrateur' })
        }
    })
    .catch(function(err) {
        res.status(500).json({ 'erreur' : `Impossible de Trouver l'Utilisateur'`, err });
    })
}

exports.updateUserProfile = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    let bio = req.body.bio;

    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Token incorrect' })
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound) {
            if(!req.file){
            userFound.update({
                bio: bio,
            })
            .then(function() {
                res.status(201).json({ 'message' : `Biographie modifié avec succès` })
            })
            .catch(function(err) {
                res.status(400).json({ 'erreur' : `Impossible de mettre à jour la Bio de l'utilisateur`, err })
            })
        } else if(userFound.avatar === null) {
            userFound.update({
                bio: bio,
                avatar: `${req.protocol}://${req.get("host")}/avatars/${req.file.filename}`
            })
            .then(function() {
                res.status(201).json({ 'message' : `Biographie modifié avec succès` })
            })
            .catch(function(err) {
                res.status(400).json({ 'erreur' : `Impossible de mettre à jour la Bio de l'utilisateur`, err })
            })
        } else {
            const filename = userFound.avatar.split('/avatars/')[1]
            fs.unlinkSync(`avatars/${filename}`)
            userFound.update({
                bio: bio,
                avatar: `${req.protocol}://${req.get("host")}/avatars/${req.file.filename}`
            })
            .then(function() {
                res.status(201).json({ 'message' : `Biographie modifié avec succès` })
            })
            .catch(function(err) {
                res.status(400).json({ 'erreur' : `Impossible de mettre à jour la Bio de l'utilisateur`, err })
            })
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'erreur' : `Impossible de vérifier l'utilisateur dans la BDD`, err })
    })
}

exports.deleteUserProfile = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Token incorrect' })
    }

    models.User.findOne({ 
        where: { id: userId }
    })
    .then(function(userFound) {
        const filename = userFound.avatar.split('/avatars/')[1]
        fs.unlinkSync(`avatars/${filename}`)
        deleteImg(userId)
        userFound.destroy()
        .then(function() {
            res.status(201).json({ 'message' : `Profil Supprimé` })
        })
        .catch(function(err) {
            res.status(409).json({ 'erreur' : `Impossible de Supprimer le Profil`, err })
        })
    })
    .catch(function(err) {
        res.status(500).json({ 'erreur' : `Impossible de Trouver l'Utilisateur`, err })
    })
}
exports.deleteUserProfileForAdmin = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Token incorrect' })
    }

    models.User.findOne({ 
        where: { id: req.params.id }
    })
    .then(function(userFound) {
        const filename = userFound.avatar.split('/avatars/')[1]
        fs.unlinkSync(`avatars/${filename}`)
        deleteImg(userFound.id)
        userFound.destroy()
        .then(function() {
            res.status(201).json({ 'message' : `Profil Supprimé` })
        })
        .catch(function(err) {
            res.status(409).json({ 'erreur' : `Impossible de Supprimer le Profil`, err })
        })
    })
    .catch(function(err) {
        res.status(500).json({ 'erreur' : `Impossible de Trouver l'Utilisateur`, err })
    })
}

exports.updatePassword = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);
    let password = req.body.password;
    let newPassword = req.body.newpassword

    if (userId < 0) {
        return res.status(401).json({ 'erreur': 'Token incorrect' })
    } if (!validator.isStrongPassword(newPassword) || newPassword == null) {
        return res.status(400).json({ 'erreur': `Format du Nouveau Mot de Passe Non Valide ou Manquant` });
    }

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound) {
        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
            if(resBycrypt) {
                if(password != newPassword) {
                bcrypt.hash(newPassword, 5)
                .then(hash => {
                    userFound.update({
                        password: hash
                    })
                    .then(() => 
                        res.status(201).json({ 'message' : `Mot de Passe Modifié`}))
                    .catch(function(err) {
                        res.status(500).json({ 'erreur' : `Impossible de mettre à jour le Mot de Passe`, err})
                    })
                })
            } else {
                return res.status(409).json({ 'erreur' : `Nouveau Mot de Passe Identique à l'Ancien`})
            }
            } else {
                return res.status(400).json({ 'erreur' : `Mot de passe initial incorrect`})
            }
        })
    })
    .catch(function(err) {
        res.status(500).json({ 'erreur' : `Impossible de Trouver l'Utilisateur`, err })
    })
}