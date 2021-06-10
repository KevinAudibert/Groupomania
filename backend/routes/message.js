const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const multer = require('../middleware/multer-config')

router.post('/new', multer, messageCtrl.createMessage)
router.get('/', messageCtrl.listMessage)
router.get('/myMessages', messageCtrl.listMessageUserId)
router.get('/myMessages/:id', messageCtrl.getOneMessage)
router.put('/myMessages/:id', messageCtrl.updateMessage)
router.delete('/myMessages/:id', messageCtrl.deleteMessage)

module.exports = router;