const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');

exports.likePost = (req, res, next) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    let messageId = parseInt(req.params.messageId);

    if (messageId <= 0) {
        return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
        function(done) {

        }
    ], function(likedPost) {

    });
}

exports.dislikePost = (req, res, next) => {

}
