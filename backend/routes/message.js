const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');

router.post('/new', messageCtrl.createMessage)
router.get('/', messageCtrl.listMessage)
router.get('/:userId', messageCtrl.listMessageUserId)
router.put('/:userId/:id', messageCtrl.updateMessage)

module.exports = router;