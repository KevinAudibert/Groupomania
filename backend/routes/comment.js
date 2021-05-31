const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.js');

router.post('/:id/newcomment', commentCtrl.createComment);
router.get('/mycomments', commentCtrl.listCommentUserId);
router.get('/:id/allcomments', commentCtrl.allCommentMessage);
router.delete('/mycomment/:id', commentCtrl.deleteComment);

module.exports = router;