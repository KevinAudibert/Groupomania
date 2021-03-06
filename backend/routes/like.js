const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/like');

router.post('/:id/like', likesCtrl.likeMessage);
router.get('/:id/alllikes', likesCtrl.getLikesMessage)

module.exports = router;