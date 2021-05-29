const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.js');

router.post('/:id/newcomment', commentCtrl.createComment)

module.exports = router;