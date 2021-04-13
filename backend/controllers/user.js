const bcrypt = require('bcrypt');
const validator = require('validator');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const { model } = require('../config/dbconnect');

const userNameMinLimit = 2
const userNameMaxLimit = 16

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
                    res.status(500).json({ 'erreur' : `Impossible d'ajouter un nouvel utilisateur`, err })
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
            return res.status(404).json({ 'erreur' : `L'utilisateur n'existe pas dans la BDD` })
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
        return res.status(400).json({ 'erreur': 'Token incorrect' })
    }

    models.User.findOne({
        attributes: [ 'id', 'email', 'username', 'bio' ],
        where: { id: userId }
    })
    .then(function(user) {
        if (user) {
            res.status(201).json(user)
        } else {
            res.status(404).json({ 'erreur': `L'utilisateur n'est pas trouvé dans la BDD` })
        }
    })
    .catch(function(err) {
        res.status(500).json({ 'erreur': `Impossible de vérifier l'utilisateur dans la BDD`, err });
    })
}

exports.updateUserProfile = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    let bio = req.body.bio;

    models.User.findOne({
        attributes: [ 'id', 'bio' ],
        where: { id: userId }
    })
    .then(function(userFound) {
        if (userFound.bio !== bio) {
            userFound.update({
                bio: (bio ? bio : userFound.bio)
            })
            .then(function() {
                return res.status(201).json({ 'message' : `Biographie modifié avec succès` })
            })
            .catch(function(err) {
                res.status(500).json({ 'erreur' : `Impossible de mettre à jour la Bio de l'utilisateur`, err })
            })
        } else {
            res.status(200).json({ 'message' : `Mise à jour inutile, texte identique` })
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'erreur' : `Impossible de vérifier l'utilisateur dans la BDD`, err })
    })
}

exports.deleteUserProfile = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    models.User.findOne({
        where: { id: userId }
    })
    .then(function(userFound) {
            models.Message.destroy({
                where: {
                    userId: userFound.id
                }
            })
            .then(function() {
                models.User.destroy({
                    where: {
                        id: userFound.id
                    }
                })
                .then(function() {
                    return res.status(201).json({ 'message' : 'Profil Supprimé avec Succès' })
                })
                .catch(function(err) {
                    return res.status(404).json({ 'erreur' : `Impossible de Supprimer le Profil`, err }) 
                })
            })
            .catch(function(err) {
                return res.status(404).json({ 'erreur' : `Impossible de Supprimer les messages`, err })  
            })              
    })
    .catch(function(err) {
        return res.status(500).json({ 'erreur' : `Impossible de vérifier l'utilisateur dans la BDD`, err })        
    })
}