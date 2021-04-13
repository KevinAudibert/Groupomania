const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');

router.post('/new', messageCtrl.createMessage)
router.get('/', messageCtrl.listMessage)
router.get('/myMessages', messageCtrl.listMessageUserId)
router.get('/myMessages/:id', messageCtrl.getOneMessageUserId)
router.put('/myMessages/:id/update', messageCtrl.updateMessage)
router.delete('/myMessages/:id/delete', messageCtrl.deleteMessage)

module.exports = router;