const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');

router.post('/new', messageCtrl.createMessage)

module.exports = router;