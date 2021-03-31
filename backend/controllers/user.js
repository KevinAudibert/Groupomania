const bcrypt = require('bcrypt');
const validator = require('validator');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const asyncLib = require('async');
const { model } = require('../config/dbconnect');

exports.signup = (req, res) => {

    //PARAMS
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let bio = req.body.bio;

    if (username.length >= 13 || username.length <= 4) {
        return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' })
    } if (!validator.isEmail(email) || email == null) {
        return res.status(400).json({ 'error': 'invalid email, enter a valid address' })
    } if (!validator.isStrongPassword(password) || password == null) {
        return res.status(400).json({ 'error': 'invalid password'});
    }

    asyncLib.waterfall([
        function(done) {
            models.User.findOne({
                attributes: ['email'],
                where: { email: email }
            })
            .then(function(userFound) {
                done(null, userFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify user', err })
            });
        },
        function(userFound, done) {
            if (!userFound) {
                bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                    done(null, userFound, bcryptedPassword);
                });
            } else {
                return res.status(409).json({ 'error': 'user already exist' });
            }
        },
        function(userFound, bcryptedPassword, done) {
            let newUser = models.User.create({
                email: email,
                username: username,
                password: bcryptedPassword,
                bio: bio,
                isAdmin: 0
            })
            .then(function(newUser) {
                done(newUser);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'cannot add user', err });
            });
        }
    ], function(newUser) {
        if (newUser) {
            return res.status(201).json({
                'userId': newUser.id
            });
        } else {
            return res.status(500).json({ 'error': 'cannot add user' });
        }
    });
}

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters '});
    }

    asyncLib.waterfall([
        function(done) {
            models.User.findOne({
                where: { email: email }
            })
            .then(function(userFound) {
                done(null, userFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify user', err })
            });
        },
        function(userFound, done) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    done(null, userFound, resBycrypt);
                });
            } else {
                return res.status(404).json({ 'error': 'user not exist in DB' });
            }
        },
        function(userFound, resBycrypt, done) {
            if (resBycrypt) {
                done(userFound);
            } else {
                return res.status(403).json({ 'error': 'invalid password'});
            }
        }
    ], function(userFound) {
        if (userFound) {
            return res.status(201).json({
                'userId': userFound.id,
                'token': jwtUtils.generateTokenForUser(userFound)
            });
        } else {
            return res.status(500).json({ 'error': 'cannot log on user' });
        }
    });
}    

exports.getUserProfile = (req,res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'wrong Token' })
    }

    models.User.findOne({
        attributes: [ 'id', 'email', 'username', 'bio' ],
        where: { id: userId }
    })
    .then(function(user) {
        if (user) {
            res.status(201).json(user)
        } else {
            res.status(404).json({ 'error': 'user not found' })
        }
    })
    .catch(function(err) {
        res.status(500).json({ 'error': 'cannot fetch user', err });
    })
}

exports.updateUserProfile = (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    let bio = req.body.bio;

    asyncLib.waterfall([
        function(done) {
            models.User.findOne({
                attributes: ['id', 'bio'],
                where: { id: userId }
            })
            .then(function(userFound) {
                done(null, userFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify user', err })
            });
        },
        function(userFound, done) {
            if (userFound) {
                userFound.update({
                    bio: (bio ? bio : userFound.bio)
                })
                .then(function() {
                    done(userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'cannot update user', err });
                });
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        },
    ], function(userFound) {
        if (userFound) {
            return res.status(201).json(userFound);
        } else {
            return res.status(500).json({ 'error': 'cannot update user profile' });
        }
    });
}    