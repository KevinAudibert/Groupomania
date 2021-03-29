const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/like');

router.post('/messages/:messageId/vote/like', likesCtrl.likePost)
router.post('/messages/:messageId/vote/dislike', likesCtrl.dislikePost)

module.exports = router;