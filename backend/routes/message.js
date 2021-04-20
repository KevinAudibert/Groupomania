const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const multer = require('../middleware/multer-config')

router.post('/new', multer, messageCtrl.createMessage)
router.get('/', messageCtrl.listMessage)
router.get('/myMessages', messageCtrl.listMessageUserId)
router.get('/myMessages/:id', messageCtrl.getOneMessageUserId)
router.put('/myMessages/:id/update', multer, messageCtrl.updateMessage)
router.delete('/myMessages/:id/delete', messageCtrl.deleteMessage)

module.exports = router;