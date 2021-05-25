const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/me', userCtrl.getUserProfile)
router.put('/me/update', multer, userCtrl.updateUserProfile)
router.delete('/me/delete', userCtrl.deleteUserProfile)

module.exports = router;