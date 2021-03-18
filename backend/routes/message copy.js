const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/like');

router.post('/messages/:messageId/vote/like', likesCtrl.likePost )

module.exports = router;