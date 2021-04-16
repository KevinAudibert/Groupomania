const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/like');

router.post('/:id/like', likesCtrl.likeMessage)
//router.post('/messages/:messageId/vote/dislike', likesCtrl.dislikePost)

module.exports = router;